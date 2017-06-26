import { renderSync } from 'node-sass';
import { writeFileSync } from 'fs';
import { insertExternalStylesheet, insertBodyScripts } from './tools/scripts/insert-stylesheet';
import { replace, prefixByQuery } from './tools/scripts/replace';
import { Ng2TemplatePlugin } from 'ng2-fused';
import { sync as glob } from 'glob';
import { sync as mkdirp } from 'mkdirp';

const npm = require('./package.json');
const app = npm.app;

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
  output: `${app.outputDir}/$name.js`,
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

Sparky.task("clean", () => Sparky.src(`${app.outputDir}`).clean(`${app.outputDir}`));
Sparky.task("assets", () => Sparky.src(`./assets/**/*.*`, { base: `./${app.assetParentDir}` }).dest(`./${app.outputDir}`));
Sparky.task("index", () => Sparky.src(`./index.html`, { base: `./src/client` }).dest(`./${app.outputDir}`));

Sparky.task("sass", () => {
  const src = Sparky.src('./src/client/styles/main.scss').file("main.scss", () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    });
    mkdirp(`./dist/css`);
    writeFileSync(`./dist/css/main-${cachebuster}.css`, result.css, (err: any) => {
      if (err) return console.log(err);
    });
  });

  if (!isProd && !process.env.CI) src.watch(['./src/client/styles/**/*.scss']);

  return src;
});

Sparky.task("sass.files", () => {
  const css = glob('./dist/css/**/*.css').map((a: string) => a.replace('./dist', ''));
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(insertExternalStylesheet(file.contents, css));
    file.save();
  });
});

Sparky.task("js.files", () => {
  const js = glob('./dist/js/**/*.js').map((a: string) => a.replace('./dist', ''));

  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(insertBodyScripts(file.contents, js));
    file.save();
  });
});

Sparky.task("index.inject", () => {
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(replace(file.contents, 'base', app.baseHref));
    file.setContent(replace(file.contents, 'favicon', '/assets/favicon.ico'));
    file.setContent(insertExternalStylesheet(file.contents, app.stylesheets));

    if (process.env.CI && process.env.CDN_ORIGIN) {
      file.setContent(prefixByQuery(file.contents, 'script', 'src', process.env.CDN_ORIGIN));
      file.setContent(prefixByQuery(file.contents, 'link', 'href', process.env.CDN_ORIGIN));
    }
    file.save();
  });
});

Sparky.task("serve", () => {
  Sparky.start('clean')
    .then(() => Sparky.start('index'))
    .then(() => Sparky.start('assets'))
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('sass.files'))
    .then(() => {
      const fuse = FuseBox.init(options as any);
      const vendorBundle = fuse.bundle(`${vendorBundleName}`).instructions(vendorBundleInstructions);
      const appBundle = fuse.bundle(`${appBundleName}`).instructions(appBundleInstructions);
      const serverBundle = fuse.bundle("server").instructions(serverBundleInstructions).completed((proc: any) => {
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

