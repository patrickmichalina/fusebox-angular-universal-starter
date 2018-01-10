import { Ng2TemplatePlugin } from 'ng2-fused';
import { argv } from 'yargs';
import { BUILD_CONFIG, ENV_CONFIG_INSTANCE, isProdBuild, typeHelper } from './tools/config/build.config';
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
  QuantumPlugin
} from 'fuse-box';
import './tools/tasks';

const death = require('death')
const isReachable = require('is-reachable');
const isAot = argv.aot;
const isBuildServer = argv.ci;
const baseEntry = isAot ? 'main.aot' : 'main';
const appBundleName = `js/app`;
const vendorBundleName = `js/vendors`;
const mainEntryFileName = isProdBuild ? `${baseEntry}-prod` : `${baseEntry}`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;
const serverBundleInstructions = ' > [server/server.ts]';

if (isProdBuild) typeHelper()

const baseOptions = {
  homeDir: './src',
  output: `${BUILD_CONFIG.outputDir}/$name.js`,
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
  hash: isProdBuild,
  plugins: [
    ...baseOptions.plugins,
    WebIndexPlugin({
      bundles: [vendorBundleName, appBundleName],
      startingDocumentPath: 'dist/index.html',
      appElement: {
        name: 'pm-app',
        innerHTML: 'Loading....'
      },
      additionalDeps: BUILD_CONFIG.dependencies as any[]
    }),
    isProdBuild && QuantumPlugin({
      target: "universal",
      warnings: false,
      uglify: true,
      treeshake: true,
      bakeApiIntoBundle: vendorBundleName,
      processPolyfill: true
    })
  ]
}

const serverOptions = {
  ...baseOptions,
  target: 'server',
  sourceMaps: false,
  plugins: [
    EnvPlugin(ENV_CONFIG_INSTANCE),
    ...baseOptions.plugins
  ]
}

Sparky.task('build.universal', () => {
  const fuseApp = FuseBox.init(appOptions as any);
  const fuseServer = FuseBox.init(serverOptions as any);
  const path = isAot ? 'client/.aot/src/client/app' : 'client/app';
  const serverBundle = fuseServer.bundle('server').instructions(serverBundleInstructions);
  const vendorBundle = fuseApp.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions)
  const appBundle = fuseApp
    .bundle(appBundleName)
    .splitConfig({ dest: 'js/modules' })
    .instructions(`${appBundleInstructions} + [${path}/**/!(*.spec|*.e2e-spec|*.ngsummary|*.snap).*]`)

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
        death(function (signal: any, err: any) {
          proc.kill()
          process.exit()
        })
      })
      return fuseServer.run()
    });
  } else {
    return fuseApp.run().then(() => fuseServer.run())
  }
});
