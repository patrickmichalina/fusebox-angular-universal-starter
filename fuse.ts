import { Ng2TemplatePlugin } from 'ng2-fused';
import { argv } from 'yargs';
import { BUILD_CONFIG, ENV_CONFIG_INSTANCE, isProdBuild, cachebuster, typeHelper } from './tools/config/build.config';
import { NgLazyPlugin } from './tools/plugins/ng-lazy';
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

const isReachable = require('is-reachable');
const isAot = argv.aot;
const isBuildServer = argv.ci;
const baseEntry = isAot ? 'main.aot' : 'main';
const mainEntryFileName = isProdBuild ? `${baseEntry}-prod` : `${baseEntry}`;
const appBundleName = isProdBuild ? `js/app-${cachebuster}` : `js/app`;
const vendorBundleName = isProdBuild ? `js/vendor-${cachebuster}` : `js/vendors`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const serverBundleInstructions = ' > [server/server.ts]';
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;

if (isProdBuild) typeHelper()

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
    HTMLPlugin({ useDefault: false })
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
      startingDocumentPath: 'dist/index.html',
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

Sparky.task('build.universal', () => {
  const fuseApp = FuseBox.init(appOptions as any);
  const fuseServer = FuseBox.init(serverOptions as any);
  const serverBundle = fuseServer.bundle('server').instructions(serverBundleInstructions);
  const path = isAot ? 'client/.aot/src/client/app' : 'client/app';
  const vendorBundle = fuseApp.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
  const appBundle = fuseApp.bundle(appBundleName)
    .instructions(`${appBundleInstructions} + [${path}/**/!(*.spec|*.e2e-spec|*.ngsummary|*.snap).*]`)
    .plugin([EnvPlugin(ENV_CONFIG_INSTANCE)]);

  if (!isBuildServer && !argv['build-only']) {
    const proxy = `${BUILD_CONFIG.host}:${BUILD_CONFIG.port}`
    vendorBundle.watch()
    appBundle.watch()
    return fuseApp.run().then(() => {
      serverBundle.watch('src/**').completed(proc => {
        typeHelper(false, false)
        proc.start();
        isReachable(proxy).then(() => {
          active
            ? reload()
            : init({
              port: BUILD_CONFIG.browserSyncPort,
              proxy
            })
        })
      })

      return fuseServer.run()
    });
  } else {
    return fuseApp.run().then(() => fuseServer.run())
  }
});
