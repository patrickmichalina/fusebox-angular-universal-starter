import { lstatSync, readdirSync } from 'fs';
import { Ng2TemplatePlugin } from 'ng2-fused';
import { ConfigurationTransformer } from './tools/config/build.transformer';
import { EnvConfigInstance } from './tools/tasks/_global';
import { prefixByQuery } from './tools/scripts/replace';
import { argv } from 'yargs';
import { BUILD_CONFIG } from './tools/config/build.config';
import { basename, resolve } from 'path';
import { NgLazyPlugin } from './tools/plugins/ng-lazy';
import * as hashFiles from 'hash-files';
import {
  EnvPlugin,
  FuseBox,
  HTMLPlugin,
  JSONPlugin,
  RawPlugin,
  SassPlugin,
  Sparky,
  UglifyESPlugin
} from 'fuse-box';
import './tools/tasks';

EnvConfigInstance.lazyBuster = {};

const isProd = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' ? true : false;
const isAot = argv.aot;
const baseEntry = argv.aot ? 'main.aot' : 'main';
const mainEntryFileName = isProd ? `${baseEntry}-prod` : `${baseEntry}`;
const appBundleName = 'js/app';
const vendorBundleName = 'js/_vendor';
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const serverBundleInstructions = ' > [server/server.ts]';
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;

const options = {
  homeDir: './src',
  output: `${BUILD_CONFIG.outputDir}/$name.js`,
  experimentalFeatures: false,
  sourceMaps: { project: false, vendor: false, inline: false },
  target: 'browser',
  plugins: [
    EnvPlugin(EnvConfigInstance), // Leave this as first plugin
    isProd && UglifyESPlugin(),
    NgLazyPlugin({
      cdn: process.env.CDN_ORIGIN ? process.env.CDN_ORIGIN : undefined
    }),
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss',
    SassPlugin({ indentedSyntax: false, importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    JSONPlugin(),
    HTMLPlugin({ useDefault: false })
  ],
  alias: {
    '@angular/platform-browser/animations': '@angular/platform-browser/bundles/platform-browser-animations.umd.js'
  }
};

Sparky.task('index.inject', () => {
  return Sparky.src('./dist/index.html').file('index.html', (file: any) => {
    file.read();
    const transformer = new ConfigurationTransformer();
    const dom = transformer.apply(BUILD_CONFIG.dependencies, file.contents.toString('utf8'));
    file.setContent(dom.serialize());
    if (process.env.CI && process.env.CDN_ORIGIN) {
      file.setContent(prefixByQuery(file.contents, 'script[src]', 'src', process.env.CDN_ORIGIN));
      file.setContent(prefixByQuery(file.contents, 'link', 'href', process.env.CDN_ORIGIN));
    }
    file.save();
  });
});

Sparky.task('serve', () => {
  return Sparky.start('clean')
    .then(() => argv.aot ? Sparky.start('ngc') : undefined)
    .then(() => Sparky.start('web'))
    .then(() => Sparky.start('index'))
    .then(() => Sparky.start('assets'))
    .then(() => isProd || !BUILD_CONFIG.skipFaviconGenerationOnDev ? Sparky.start('favicons') : undefined)
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('sass.files'))
    .then(() => {
      EnvConfigInstance.lazyBuster = {};

      const fuse = FuseBox.init(options as any);
      const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
      const appBundle = fuse.bundle(appBundleName);

      const root = 'src';
      const compSuffix = argv.aot ? 'component.ngfactory.ts' : 'component.ts';
      const relative = isAot ? 'client/.aot/src/client/app' : 'client/app';
      const rootPath = `${root}/${relative}`;

      readdirSync(resolve(rootPath)).forEach(file => {
        const lstat = lstatSync(resolve(rootPath, file));
        if (lstat.isDirectory()) {
          const dirName = basename(file);

          if (dirName[0] === '+') {
            const moduleName = dirName.substring(1);

            const checksum = hashFiles.sync({
              files: resolve(rootPath, file, '**')
            });

            let bundlePath = `js/bundle-${checksum}-${moduleName}.module.js`;

            // if (process.env.CI && process.env.CDN_ORIGIN) { 

            // }

            EnvConfigInstance.lazyBuster[moduleName] = checksum;
            appBundle
              // tslint:disable-next-line:max-line-length
              .split(`${relative}/${dirName}/**`, `${bundlePath} > ${relative}/${dirName}/${moduleName}.${compSuffix}`);
          }
        }
      });

      appBundle.instructions(`${appBundleInstructions} + [${relative}/**/!(*.spec|*.e2e-spec|*.ngsummary|*.snap).*]`);

      appBundle.plugin([EnvPlugin(EnvConfigInstance)]);

      let serverBundle: any;

      if (!argv.spa) serverBundle = fuse.bundle('server').instructions(serverBundleInstructions);
      if (argv.spa) fuse.dev({ port: EnvConfigInstance.server.port, root: 'dist' });

      // tslint:disable-next-line:curly
      if (!isProd && !process.env.CI) {
        if (argv.spa) {
          vendorBundle.watch().hmr();
          appBundle.watch().hmr();
        } else {
          vendorBundle.watch();
          appBundle.watch();
          serverBundle.completed((proc: any) => {
            if (!process.env.CI) proc.start();
          }).watch();
        }
      }

      return fuse.run();
    })
    .then(() => Sparky.start('js.files'))
    .then(() => Sparky.start('index.inject'))
    .then(() => Sparky.start('index.minify'));
});
