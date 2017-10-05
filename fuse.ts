import { Ng2TemplatePlugin } from 'ng2-fused';
import { argv } from 'yargs';
import { BUILD_CONFIG, ENV_CONFIG_INSTANCE, isProdBuild, cachebuster, typeHelper } from './tools/config/build.config';
import { NgLazyPlugin } from './tools/plugins/ng-lazy';
import { PwaFusedPlugin } from './tools/plugins/pwa-fused';
import { WebIndexPlugin } from './tools/plugins/web-index';
import { init, reload, active } from 'browser-sync';
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
const vendorBundleName = isProdBuild ? `js/vendor-${cachebuster}` : `js/vendors`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const serverBundleInstructions = ' > [server/server.ts]';
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;

const baseOptions = {
  homeDir: './src',
  output: `${BUILD_CONFIG.outputDir}/$name.js`,
  cache: false,
  target: 'browser',
  plugins: [
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss',
      SassPlugin({ indentedSyntax: false, importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    JSONPlugin(),
    HTMLPlugin({ useDefault: false }),
    PwaFusedPlugin({
      distPath: 'dist',
      manifest: {
        name: 'Fusebox Angular Universal Starter',
      }
    })
  ]
}

const appOptions = {
  ...baseOptions,
  sourceMaps: isProdBuild || process.env.CI
    ? { project: false, vendor: false, inline: false }
    : { project: true, vendor: true, inline: true },
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE),
    NgLazyPlugin({
      angularAppEntry: '',
      angularAppRoot: 'src/client/app',
      angularBundle: appBundleName,
      aot: isAot,
      isProdBuild
    }),
    WebIndexPlugin({
      bundles: [appBundleName, vendorBundleName],
      appElement: {
        name: 'pm-app',
        innerHTML: 'Loading....'
      },
      additionalDeps: BUILD_CONFIG.dependencies as any[]
    }),
    isProdBuild && UglifyESPlugin(),
    ...baseOptions.plugins
  ]
}

const serverOptions = {
  ...baseOptions,
  sourceMaps: false,
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE),
    NgLazyPlugin({
      angularAppEntry: '',
      angularAppRoot: 'src/client/app',
      angularBundle: appBundleName,
      aot: isAot,
      isProdBuild,
      isUniversalServer: true
    }),
    ...baseOptions.plugins
  ]
}

Sparky.task('build.server', () => {
  if (isSpaOnly) return Promise.resolve();

  const fuse = FuseBox.init(serverOptions as any);
  const serverBundle = fuse.bundle('server').instructions(serverBundleInstructions);

  if (!isBuildServer && !argv['build-only']) {
    const reloadDelay = 2000;
    serverBundle.watch('src/**').completed(proc => {
      proc.start();
      setTimeout(() => {
        if (!active) {
          init({
            reloadDelay,
            port: BUILD_CONFIG.browserSyncPort,
            proxy: `${BUILD_CONFIG.host}:${BUILD_CONFIG.port}`
          });
        }
      }, reloadDelay)
    });
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


  if (isProdBuild) typeHelper()

  if (!isBuildServer && !argv['build-only']) {
    vendorBundle.watch();

    if (argv.spa) {
      fuse.dev({ port: BUILD_CONFIG.port, root: 'dist', open: true });
      vendorBundle.hmr();
      appBundle.watch().hmr();
    } else {
      appBundle.watch().completed(() => {
        typeHelper(false, false)
        reload()
      });
    }
  }

  return fuse.run();
});
