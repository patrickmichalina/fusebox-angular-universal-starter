import { renderSync } from 'node-sass';
import { writeFileSync } from 'fs';
import { insertExternalStylesheet } from './tools/scripts/insert-stylesheet';
import { replace } from './tools/scripts/replace';
import { Ng2TemplatePlugin } from 'ng2-fused';
import { sync as glob } from 'glob';
import { sync as mkdirp } from 'mkdirp';
import * as CleanCSS from 'clean-css';

const npm = require('./package.json');
const app = npm.app;

import {
  FuseBox,
  Sparky,
  SassPlugin,
  WebIndexPlugin,
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
const vendorBundleName = `js/vendor-${cachebuster}`;
const vendorBundleInstructions = ` ~ client/${mainEntryFileName}.ts`;
const appBundleInstructions = ` !> [client/${mainEntryFileName}.ts]`;
const serverBundleInstructions = ` > [server/server.ts]`;

const options = {
  homeDir: 'src/',
  output: `${app.outputDir}/$name.js`,
  plugins: [
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss', SassPlugin({ importer: true, sourceMap: false, outputStyle: 'compressed' } as any), RawPlugin()],
    TypeScriptHelpers(),
    WebIndexPlugin({
      title: app.name,
      template: './dist/index.html',
      bundles: [vendorBundleName, appBundleName]
    }),
    JSONPlugin(),
    HTMLPlugin({ useDefault: false }),

  ],
  alias: {
    "@angular/platform-browser/animations": "@angular/platform-browser/bundles/platform-browser-animations.umd.js",
  }
}

Sparky.task("clean", () => Sparky.src(`${app.outputDir}`).clean(`${app.outputDir}`));
Sparky.task("assets", () => Sparky.src(`./assets/**/*.*`, { base: `./${app.assetParentDir}` }).dest(`./${app.outputDir}`));
Sparky.task("index", () => Sparky.src(`./index.html`, { base: `./src/client` }).dest(`./${app.outputDir}`));

Sparky.task("sass", () => {
  return Sparky.watch('./src/client/styles/**/*.scss').file("*.scss", () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    });
    const css = new CleanCSS().minify(result.css.toString()).styles;

    mkdirp(`./dist/css`);
    writeFileSync(`./dist/css/main-${cachebuster}.css`, css, (err: any) => {
      if (err) return console.log(err);
    });
  });
});

Sparky.task("sass.files", () => {
  const css = glob('./dist/css/**/*.css').map((a: string) => a.replace('./dist', ''));
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(insertExternalStylesheet(file.contents, css));
    file.save();
  });
});

Sparky.task("index.inject", () => {
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(replace(file.contents, 'base', app.baseHref));
    file.setContent(replace(file.contents, 'favicon', '/assets/favicon.ico'));
    file.setContent(insertExternalStylesheet(file.contents, app.stylesheets));
    file.save();
  });
});

Sparky.task("serve", () => {
  return new Promise((resolve) => {
    return resolve(Sparky.start('clean')
      .then(() => Sparky.start('index'))
      .then(() => Sparky.start('assets'))
      .then(() => Sparky.start('sass'))
      .then(() => Sparky.start('sass.files'))
      .then(() => Sparky.start('index.inject'))
      .then(() => {
        const fuse = FuseBox.init(options as any);

        if (isProd) {
          fuse.opts.sourceMaps = { project: false, vendor: false };
          fuse.opts.plugins = [...fuse.opts.plugins as any[], UglifyESPlugin()];
        } else {
          fuse.opts.sourceMaps = { project: true, vendor: true };
        }

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

        fuse.run();//.then(() => fuse.triggerEnd());
      }));
  });

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

// Sparky.task("cdn", () => {
//   if (!process.env.CDN_ORIGIN) return;
//   return Sparky.src("./dist/prod/index.html").file("index.html", file => {
//     file.read();
//     const dom = new JSDOM(file.contents);
//     dom.window.document.querySelectorAll('[src]').forEach(script => {
//       script.src = process.env.CDN_ORIGIN + script.src
//     });
//     dom.window.document.querySelectorAll('[data-inject-href]').forEach(link => {
//       link.href = process.env.CDN_ORIGIN + link.href;
//       link.removeAttribute('data-inject-href')
//     })
//     file.setContent(dom.serialize());
//     file.save();
//   });
// })
