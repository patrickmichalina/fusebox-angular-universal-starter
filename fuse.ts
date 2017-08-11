import { Ng2TemplatePlugin } from 'ng2-fused';
import { argv } from 'yargs';
import { BUILD_CONFIG, ENV_CONFIG_INSTANCE, isProdBuild, cachebuster, cdn } from './tools/config/build.config';
import { NgLazyPlugin } from './tools/plugins/ng-lazy';
import { init, reload, active } from 'browser-sync';
import { readFileSync, writeFileSync } from 'fs';
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

const isAot = argv.aot;
const isBuildServer = argv.ci;
const isSpaOnly = argv.spa;
const baseEntry = isAot ? 'main.aot' : 'main';
const mainEntryFileName = isProdBuild ? `${baseEntry}-prod` : `${baseEntry}`;
const appBundleName = isProdBuild ? `js/app-${cachebuster}` : `js/app`;
const vendorBundleName = isProdBuild ? `js/_vendor-${cachebuster}` : `js/_vendors`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const serverBundleInstructions = ' > [server/server.ts]';
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;

const baseOptions = {
  homeDir: './src',
  output: `${BUILD_CONFIG.outputDir}/$name.js`,
  cache: true,
  target: 'browser',
  plugins: [
    NgLazyPlugin({
      cdn,
      angularAppEntry: '',
      angularAppRoot: 'src/client/app',
      angularBundle: appBundleName,
      aot: isAot,
      isProdBuild
    }),
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss',
      SassPlugin({ indentedSyntax: false, importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    JSONPlugin(),
    HTMLPlugin({ useDefault: false }),
  ]
}

const appOptions = {
  ...baseOptions,
  sourceMaps: isProdBuild || process.env.CI
    ? { project: false, vendor: false, inline: false }
    : { project: true, vendor: true, inline: true },
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE),
    isProdBuild && UglifyESPlugin(),
    ...baseOptions.plugins
  ]
}

const serverOptions = {
  ...baseOptions,
  sourceMaps: false,
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE),
    ...baseOptions.plugins
  ]
}

Sparky.task('build.server', () => {
  if (isSpaOnly) return Promise.resolve();

  const fuse = FuseBox.init(serverOptions as any);
  const serverBundle = fuse.bundle('server').instructions(serverBundleInstructions);

  if (!isBuildServer && !argv['build-only']) {
    serverBundle.watch('src/**').completed(proc => {
      if (cdn) removeCdn(proc, cdn);
      proc.start();
      setTimeout(() => {
        if (active) {
          // reload();
        } else {
          init({
            reloadDelay: 2000,
            port: BUILD_CONFIG.browserSyncPort,
            proxy: `localhost:${ENV_CONFIG_INSTANCE.server.port}`
          });
        }
      }, 1300)
    });
  } else {
    serverBundle.completed(proc => {
      if (cdn) removeCdn(proc, cdn);
    })
  }

  return fuse.run();
});

Sparky.task('build.app', () => {
  const fuse = FuseBox.init(appOptions as any);
  const path = isAot ? 'client/.aot/src/client/app' : 'client/app';
  const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
  const appBundle = fuse.bundle(appBundleName)
    .instructions(`${appBundleInstructions} + [${path}/**/!(*.spec|*.e2e-spec|*.ngsummary|*.snap).*]`)
    .plugin([EnvPlugin(ENV_CONFIG_INSTANCE)]);

  if (!isBuildServer && !argv['build-only']) {
    vendorBundle.watch();

    // if (active) reload();

    if (argv.spa) {
      fuse.dev({ port: ENV_CONFIG_INSTANCE.server.port, root: 'dist', open: true });
      vendorBundle.hmr();
      appBundle.watch().hmr();
    } else {
      appBundle.watch().completed(() => reload());
    }
  }

  return fuse.run();
});

Sparky.task('serve', () => {
  return Sparky.start('clean')
    .then(() => argv.aot ? Sparky.start('ngc') : Promise.resolve())
    .then(() => Sparky.start('web'))
    .then(() => Sparky.start('index.copy'))
    .then(() => Sparky.start('assets'))
    .then(() => isProdBuild || !BUILD_CONFIG.skipFaviconGenerationOnDev ? Sparky.start('favicons') : Promise.resolve())
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('sass.files'))
    .then(() => Sparky.start('build.app'))
    .then(() => Sparky.start('build.server'))
    .then(() => Sparky.start('js.files'))
    .then(() => Sparky.start('index.inject'))
    .then(() => Sparky.start('index.minify'))
    .then(() => Sparky.start('banner'));
});

const removeCdn = (proc: any, cdnHost: string) => {
  var file = readFileSync(proc.filePath, 'utf-8');
  const cdnRemoved = file.replace(new RegExp(cdnHost.replace('https:', ''), 'g'), '.');
  writeFileSync(proc.filePath, cdnRemoved, { encoding: 'utf-8' });
}