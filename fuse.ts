import { Ng2TemplatePlugin } from 'ng2-fused';
import { BuildConfig } from './tools/config/build.config';
import { ConfigurationTransformer } from './tools/config/build.transformer';
import { EnvConfigInstance } from './tools/tasks/_global';
import { prefixByQuery } from './tools/scripts/replace';
import { argv } from 'yargs';
import { readdirSync, lstatSync } from 'fs';
import { resolve, basename } from 'path';
const hashFiles = require('hash-files');

import {
  FuseBox,
  Sparky,
  SassPlugin,
  JSONPlugin,
  HTMLPlugin,
  UglifyESPlugin,
  RawPlugin,
  EnvPlugin
} from 'fuse-box';
import './tools/tasks';

EnvConfigInstance.lazyBuster = {};

const isProd = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' ? true : false;
const baseEntry = argv.aot ? 'main.aot' : 'main';
const mainEntryFileName = isProd ? `${baseEntry}-prod` : `${baseEntry}`;
const appBundleName = `js/app`;
// const lazyBundleSuffix = `js/bundle-${cachebuster}-`;
const vendorBundleName = `js/_vendor`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
// const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;
const serverBundleInstructions = ` asd > [server/server.ts]`;

const options = {
  homeDir: './src',
  output: `${BuildConfig.outputDir}/$name.js`,
  sourceMaps: isProd || process.env.CI ? { project: false, vendor: false } : { project: false, vendor: false },
  plugins: [
    EnvPlugin(EnvConfigInstance),
    isProd && UglifyESPlugin(),
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss', SassPlugin({ indentedSyntax: false, importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    JSONPlugin(),
    HTMLPlugin({ useDefault: false })
  ],
  alias: {
    "@angular/platform-browser/animations": "@angular/platform-browser/bundles/platform-browser-animations.umd.js"
  }
}

Sparky.task("index.inject", () => {
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    const transformer = new ConfigurationTransformer();
    const dom = transformer.apply(BuildConfig.dependencies, file.contents.toString('utf8'));
    file.setContent(dom.serialize());
    if (process.env.CI && process.env.CDN_ORIGIN) {
      file.setContent(prefixByQuery(file.contents, 'script[src]', 'src', process.env.CDN_ORIGIN));
      file.setContent(prefixByQuery(file.contents, 'link', 'href', process.env.CDN_ORIGIN));
    }
    file.save();
  });
});

Sparky.task("serve", () => {
  return Sparky.start('clean')
    .then(() => argv.aot ? Sparky.start('ngc') : undefined)
    .then(() => Sparky.start('web'))
    .then(() => Sparky.start('index'))
    .then(() => Sparky.start('assets'))
    .then(() => Sparky.start('favicons'))
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('sass.files'))
    .then(() => {
      const fuse = FuseBox.init(options as any);
      const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions).target('browser');
      const appBundle = fuse.bundle(appBundleName)

      EnvConfigInstance.lazyBuster = {};

      readdirSync(resolve('src/client/app')).forEach(file => {
        const lstat = lstatSync(resolve('src/client/app', file));
        if (lstat.isDirectory()) {
          const dirName = basename(file);

          if (dirName[0] === '+') {
            const moduleName = dirName.substring(1);

            const checksum = hashFiles.sync({
              files: resolve('src/client/app', file, '**')
            })

            EnvConfigInstance.lazyBuster[moduleName] = checksum;

            appBundle.split('client/app/' + dirName + '/**', `js/bundle-${checksum}-${moduleName}` + '.module.js > client/app/' + dirName + '/' + moduleName + '.component.ts');
          }
        }
      });

      appBundle.instructions('!> [client/main.ts] + [client/app/**/*.module.ts] + [client/app/**/!(*.spec|*.e2e-spec).*]')
        .plugin(EnvPlugin(EnvConfigInstance))
        .target('browser');

      const serverBundle = fuse.bundle("server").instructions(serverBundleInstructions).target('browser');

      if (argv.spa) fuse.dev({ port: EnvConfigInstance.server.port, root: 'dist' });

      if (!isProd && !process.env.CI) {
        if (argv.spa) {
          vendorBundle.watch().hmr();
          appBundle.watch().hmr();
        } else {
          vendorBundle.watch();
          appBundle.watch();
          serverBundle.completed(proc => {
            if (!process.env.CI) {
              proc.start();
            }
          }).watch();
        }
      }

      return fuse.run();
    })
    .then(() => Sparky.start('js.files'))
    .then(() => Sparky.start('index.inject'))
    .then(() => Sparky.start('index.minify'))
});
