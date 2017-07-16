import { Ng2TemplatePlugin } from 'ng2-fused';
import { ConfigurationTransformer } from './tools/config/build.transformer';
import { prefixByQuery } from './tools/scripts/replace';
import { argv } from 'yargs';
import { BUILD_CONFIG } from './tools/config/build.config';
import { ENV_CONFIG_INSTANCE, isProdBuild } from './tools/tasks/_global';
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
  UglifyESPlugin
} from 'fuse-box';
import { readFileSync, writeFileSync } from 'fs';
import './tools/tasks';

const isAot = argv.aot;
const isBuildServer = argv.ci;
const baseEntry = isAot ? 'main.aot' : 'main';
const cdn = process.env.CDN_ORIGIN;
const mainEntryFileName = isProdBuild ? `${baseEntry}-prod` : `${baseEntry}`;
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
  cache: false,
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE), // Leave this as first plugin
    isProdBuild && UglifyESPlugin(),
    NgLazyPlugin({
      cdn,
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
    HTMLPlugin({ useDefault: false }),

  ] as Plugin[]
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
    .then(() => argv.aot ? Sparky.start('ngc') : Promise.resolve())
    .then(() => Sparky.start('web'))
    .then(() => Sparky.start('index'))
    .then(() => Sparky.start('assets'))
    .then(() => isProdBuild || !BUILD_CONFIG.skipFaviconGenerationOnDev ? Sparky.start('favicons') : Promise.resolve())
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('sass.files'))
    .then(() => {
      const fuse = FuseBox.init(options as any);
      const path = isAot ? 'client/.aot/src/client/app' : 'client/app';
      const serverBundle = fuse.bundle('server').instructions(serverBundleInstructions);
      const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
      const appBundle = fuse.bundle(appBundleName)
        .instructions(`${appBundleInstructions} + [${path}/**/!(*.spec|*.e2e-spec|*.ngsummary|*.snap).*]`)
        .plugin([EnvPlugin(ENV_CONFIG_INSTANCE)]);

      if (!isBuildServer) {
        vendorBundle.watch();
        appBundle.watch()

        if (argv.spa) {
          fuse.dev({ port: ENV_CONFIG_INSTANCE.server.port, root: 'dist' });
          vendorBundle.hmr();
          appBundle.hmr();
        } else {
          serverBundle.completed(proc => {
            if (cdn) {
              var file = readFileSync(proc.filePath, 'utf-8');
              const cdnRemoved = file.replace(new RegExp(cdn, 'g'), '.');
              writeFileSync(proc.filePath, cdnRemoved, { encoding: 'utf-8' });
            }

            proc.start()
          }).watch();
        }
      } else {
        serverBundle.completed(a => {
          var d = readFileSync(a.filePath);
          console.log(d.toString());
        })
      }

      return fuse.run();
    })
    .then(() => Sparky.start('js.files'))
    .then(() => Sparky.start('index.inject'))
    .then(() => Sparky.start('index.minify'));
});
