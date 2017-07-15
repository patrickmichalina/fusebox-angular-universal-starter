import { Ng2TemplatePlugin } from 'ng2-fused';
import { ConfigurationTransformer } from './tools/config/build.transformer';
import { prefixByQuery } from './tools/scripts/replace';
import { argv } from 'yargs';
import { BUILD_CONFIG } from './tools/config/build.config';
import { ENV_CONFIG_INSTANCE } from './tools/tasks/_global';
import { NgLazyPlugin } from './tools/plugins/ng-lazy';
import { Plugin } from 'fuse-box/src/core/WorkflowContext';
import {
  EnvPlugin,
  FuseBox,
  HTMLPlugin,
  JSONPlugin,
  RawPlugin,
  SassPlugin,
  Sparky,
  UglifyESPlugin,
  // Bundle
} from 'fuse-box';
import './tools/tasks';

const isProd = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' ? true : false;
const isAot = argv.aot;
const baseEntry = isAot ? 'main.aot' : 'main';
const mainEntryFileName = isProd ? `${baseEntry}-prod` : `${baseEntry}`;
const appBundleName = 'js/app';
const vendorBundleName = 'js/_vendor';
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const serverBundleInstructions = ' > [server/server.ts]';
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;

const options: any = {
  homeDir: './src',
  output: `${BUILD_CONFIG.outputDir}/$name.js`,
  experimentalFeatures: false,
  sourceMaps: { project: false, vendor: false, inline: false },
  target: 'browser',
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE), // Leave this as first plugin
    isProd && UglifyESPlugin(),
    NgLazyPlugin({
      cdn: process.env.CDN_ORIGIN ? process.env.CDN_ORIGIN : undefined,
      angularAppEntry: '',
      angularAppRoot: 'src/client/app',
      angularBundle: 'js/app',
      aot: isAot
    }),
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss',
      SassPlugin({ indentedSyntax: false, importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    JSONPlugin(),
    HTMLPlugin({ useDefault: false })
  ] as Plugin[]
  // alias: {
  //   // '@angular/platform-browser/animations': '@angular/platform-browser/bundles/platform-browser-animations.umd.js'
  // }
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
      const fuse = FuseBox.init(options as any);
      const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
      const path = isAot ? 'client/.aot/src/client/app' : 'client/app';

      const appBundle = fuse.bundle(appBundleName)
        .cache(false)
        .instructions(`${appBundleInstructions} + [${path}/**/!(*.spec|*.e2e-spec|*.ngsummary|*.snap).*]`)
        .plugin([EnvPlugin(ENV_CONFIG_INSTANCE)]);

      if (process.env.CI) return fuse.run();

      vendorBundle.watch();
      appBundle.watch()

      if (argv.spa) {
        fuse.dev({ port: ENV_CONFIG_INSTANCE.server.port, root: 'dist' });
        vendorBundle.hmr();
        appBundle.hmr();
      } else {
        const serverBundle = fuse.bundle('server').cache(false).instructions(serverBundleInstructions);
        serverBundle.completed(proc => proc.start()).watch();
      }

      return fuse.run();
    })
    .then(() => Sparky.start('js.files'))
    .then(() => Sparky.start('index.inject'))
    .then(() => Sparky.start('index.minify'));
});
