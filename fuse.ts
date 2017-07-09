import { Ng2TemplatePlugin } from 'ng2-fused';
import { BuildConfig } from './tools/config/build.config';
import { ConfigurationTransformer } from './tools/config/build.transformer';
import { EnvConfigInstance } from './tools/tasks/_global';
import { argv } from 'yargs';
import {
  FuseBox,
  Sparky,
  SassPlugin,
  TypeScriptHelpers,
  JSONPlugin,
  HTMLPlugin,
  UglifyESPlugin,
  RawPlugin,
  EnvPlugin
} from 'fuse-box';
import './tools/tasks';

const cachebuster = Math.round(new Date().getTime() / 1000);
const isProd = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' ? true : false;
const baseEntry = argv.aot ? 'main.aot' : 'main';
const mainEntryFileName = isProd ? `${baseEntry}-prod` : `${baseEntry}`;
const appBundleName = `js/app-${cachebuster}`;
const vendorBundleName = `js/_vendor-${cachebuster}`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;
const serverBundleInstructions = ` > [server/server.ts]`;

const options = {
  homeDir: 'src/',
  output: `${BuildConfig.outputDir}/$name.js`,
  sourceMaps: isProd || process.env.CI ? { project: false, vendor: false } : { project: true, vendor: true },
  plugins: [
    EnvPlugin(EnvConfigInstance),
    isProd && UglifyESPlugin(),
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss', SassPlugin({ indentedSyntax: false, importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    TypeScriptHelpers(),
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
      const appBundle = fuse.bundle(`${appBundleName}`).instructions(appBundleInstructions).target('browser');
      const serverBundle = fuse.bundle("server").instructions(serverBundleInstructions).target('browser')

      if (argv.spa) fuse.dev({ port: EnvConfigInstance.server.port });

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
