const npm = require('./package.json');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = npm.app;
const { Ng2TemplatePlugin } = require('ng2-fused');
const {
  Sparky,
  FuseBox,
  SassPlugin,
  CSSPlugin,
  WebIndexPlugin,
  TypeScriptHelpers,
  JSONPlugin,
  HTMLPlugin,
  UglifyESPlugin,
  RawPlugin
} = require('fuse-box');

const cachebuster = Math.round(new Date().getTime() / 1000);

const appBundleName = `js/app-${cachebuster}`;
const vendorBundleName = `js/vendor-${cachebuster}`;

const baseOptions = {
  homeDir: 'src/',
  plugins: [
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss', SassPlugin({ importer: true, sourceMap: false, outputStyle: 'compressed' }), RawPlugin()],
    TypeScriptHelpers(),
    WebIndexPlugin({
      title: app.name,
      template: 'src/client/index.html',
      bundles: [vendorBundleName, appBundleName]
    }),
    JSONPlugin(),
    HTMLPlugin({ useDefault: false }),

  ],
  alias: {
    "@angular/platform-browser/animations": "@angular/platform-browser/bundles/platform-browser-animations.umd.js",
  }
}

const devOptions = Object.assign({
  output: `${app.outputDir}/dev/$name.js`,
  sourceMaps: { project: true, vendor: true }
}, baseOptions);

const prodOptions = Object.assign(baseOptions, {
  output: `${app.outputDir}/prod/$name.js`,
  sourceMaps: { project: false, vendor: false }
})

Sparky.task("clean", () => Sparky.src(`${app.outputDir}`).clean(`${app.outputDir}`));
Sparky.task("assets.dev", () => Sparky.src(`./assets/**/*.*`, { base: `./${app.assetParentDir}` }).dest(`./${app.outputDir}/dev`));
Sparky.task("assets.prod", () => Sparky.src(`./assets/**/*.*`, { base: `./${app.assetParentDir}` }).dest(`./${app.outputDir}/prod`));
Sparky.task("build.dev", ["clean", "assets.dev"], () => undefined);
Sparky.task("build.prod", ["clean", "assets.prod"], () => undefined);


Sparky.task("cdn", () => {
  if (!process.env.CDN_ORIGIN) return;
  return Sparky.src("./dist/prod/index.html").file("index.html", file => {
    file.read();
    const dom = new JSDOM(file.contents);
    dom.window.document.querySelectorAll('[src]').forEach(script => {
      script.src = process.env.CDN_ORIGIN + script.src
    });
    dom.window.document.querySelectorAll('link').forEach(link => {
      link.href = process.env.CDN_ORIGIN + link.src
    })
    file.setContent(dom.serialize());
    file.save();
  });
})

Sparky.task("serve.dev.spa", ["clean"], () => {
  const fuse = FuseBox.init(devOptions);
  fuse.opts = devOptions;
  fuse.dev({ port: app.server.port });
  fuse.bundle('js/vendor').hmr().instructions(' ~ client/main.ts');
  fuse.bundle('js/app')
    .instructions(' !> [client/main.ts]')
    .watch()
    .hmr();
  fuse.run()
});

Sparky.task("serve.dev.universal", ["build.dev"], () => {
  const fuse = FuseBox.init(devOptions);
  fuse.dev({ httpServer: false });
  fuse.bundle(`${vendorBundleName}`).instructions(' ~ client/main.ts').watch();
  fuse.bundle(`${appBundleName}`).instructions(" !> [client/main.ts]").watch();
  fuse.bundle("server").instructions(" > [server/server.ts]")
    .watch()
    .completed(proc => proc.start())
  fuse.run()
});

Sparky.task("serve.prod.universal", ["build.prod"], () => {
  const fuse = FuseBox.init(prodOptions);
  fuse.dev({ httpServer: false });
  fuse.bundle(`${vendorBundleName}`).instructions(' ~ client/main-prod.ts').watch();
  fuse.bundle(`${appBundleName}`).instructions(" !> [client/main-prod.ts]").watch();
  fuse.bundle("server").instructions(" > [server/server.ts]")
    .completed(proc => proc.start())
  fuse.run()
});

Sparky.task("serve.prod.min.universal", ["build.prod"], () => {
  const fuse = FuseBox.init(prodOptions);
  fuse.opts.plugins = [...fuse.opts.plugins, UglifyESPlugin()]
  fuse.dev({ httpServer: false });
  fuse.bundle(`${vendorBundleName}`).instructions(' ~ client/main-prod.ts');
  fuse.bundle(`${appBundleName}`).instructions(" !> [client/main-prod.ts]");
  fuse.bundle("server").instructions(" > [server/server.ts]")
    .completed(proc => proc.start())
  fuse.run()
})

Sparky.task("build.prod.min.universal", ["build.prod"], () => {
  const fuse = FuseBox.init(prodOptions);
  fuse.opts.plugins = [...fuse.opts.plugins, UglifyESPlugin()]
  fuse.bundle(`${vendorBundleName}`).instructions(' ~ client/main-prod.ts');
  fuse.bundle(`${appBundleName}`).instructions(" !> [client/main-prod.ts]");
  fuse.bundle("server").instructions(" > [server/server.ts]");
  fuse.run().then(() => setTimeout(() => Sparky.start('cdn'), 1500));
})
