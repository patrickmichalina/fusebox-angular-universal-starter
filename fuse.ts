import { insertFavicon, insertBase, insertExternalStylesheet, insertTitle, insertGoogleAnalytics } from './tools/scripts/insert-stylesheet';
import { prefixByQuery } from './tools/scripts/replace';
import { Ng2TemplatePlugin } from 'ng2-fused';
import { config } from './tools/config';
import './tools/tasks';
import {
  FuseBox,
  Sparky,
  SassPlugin,
  TypeScriptHelpers,
  JSONPlugin,
  HTMLPlugin,
  UglifyESPlugin,
  RawPlugin
} from 'fuse-box';

const cachebuster = Math.round(new Date().getTime() / 1000);
const isProd = process.env.NODE_ENV === 'prod' ? true : false;
const mainEntryFileName = isProd ? `main-prod` : `main`;
const appBundleName = `js/app-${cachebuster}`;
const vendorBundleName = `js/_vendor-${cachebuster}`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;
const serverBundleInstructions = ` > [server/server.ts]`;

const options = {
  homeDir: 'src/',
  output: `${config.outputDir}/$name.js`,
  sourceMaps: isProd || process.env.CI ? { project: false, vendor: false } : { project: true, vendor: true },
  plugins: [
    isProd && UglifyESPlugin(),
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss', SassPlugin({ importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    TypeScriptHelpers(),
    JSONPlugin(),
    HTMLPlugin({ useDefault: false })
  ],
  alias: {
    "@angular/platform-browser/animations": "@angular/platform-browser/bundles/platform-browser-animations.umd.js",
  }
}

Sparky.task("index.inject", () => {
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();

    file.setContent(insertBase(file.contents, config.baseHref));
    file.setContent(insertFavicon(file.contents, '/assets/favicon.ico'));

    file.setContent(insertExternalStylesheet(file.contents, config.stylesheets));
    file.setContent(insertTitle(file.contents, config.title));

    if (process.env.GA_TRACKING_ID) {
      file.setContent(insertGoogleAnalytics(file.contents, process.env.GA_TRACKING_ID));
    }

    if (process.env.CI && process.env.CDN_ORIGIN) {
      file.setContent(prefixByQuery(file.contents, 'script[src]', 'src', process.env.CDN_ORIGIN));
      file.setContent(prefixByQuery(file.contents, 'link', 'href', process.env.CDN_ORIGIN));
    }
    file.save();
  });
});

Sparky.task("serve", () => {
  return Sparky.start('clean')
    .then(() => Sparky.start('web'))
    .then(() => Sparky.start('index'))
    .then(() => Sparky.start('assets'))
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('sass.files'))
    .then(() => {
      const fuse = FuseBox.init(options as any);
      const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
      const appBundle = fuse.bundle(`${appBundleName}`).instructions(appBundleInstructions);
      const serverBundle = fuse.bundle("server").instructions(serverBundleInstructions)

        .completed(proc => {
          if (!process.env.CI) {
            proc.start();
          }
        });

      if (!isProd && !process.env.CI) {
        vendorBundle.watch();
        appBundle.watch();
        serverBundle.watch();
      }

      return fuse.run();
    })
    .then(() => Sparky.start('js.files'))
    .then(() => Sparky.start('index.inject'))
});

// Sparky.task("serve.spa.hmr", ["clean"], () => {
//   const fuse = FuseBox.init(devOptions);
//   fuse.opts = devOptions;
//   fuse.dev({ port: app.server.port });
//   fuse.bundle('js/vendor').hmr().instructions(' ~ client/main.ts');
//   fuse.bundle('js/app')
//     .instructions(' !> [client/main.ts]')
//     .watch()
//     .hmr();
//   fuse.run()
// });

