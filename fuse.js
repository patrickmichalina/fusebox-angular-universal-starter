const npm = require('./package.json');
const app = npm.app;
const {
  Sparky,
  BabelPlugin,
  FuseBox,
  SassPlugin,
  CSSPlugin,
  WebIndexPlugin,
  TypeScriptHelpers,
  JSONPlugin,
  HTMLPlugin,
  UglifyESPlugin,
  RawPlugin,
  CopyPlugin,
  CSSResourcePlugin
} = require('fuse-box');
const { Ng2TemplatePlugin } = require('ng2-fused');

const fuse = FuseBox.init({
  homeDir: 'src/',
  output: 'dist/$name.js',
  sourceMaps: { project: true, vendor: true },
  plugins: [
    Ng2TemplatePlugin(),
    ['*.component.html', RawPlugin()],
    ['*.component.scss', SassPlugin({ sourceMap: false }), RawPlugin()],
    TypeScriptHelpers(),
    WebIndexPlugin({
      title: app.title,
      template: 'src/client/index.html',
      bundles: ['js/vendor', 'js/app']
    }),
    JSONPlugin(),
    HTMLPlugin({
      useDefault: false,
    })
  ],
  alias: {
    "@angular/platform-browser/animations": "@angular/platform-browser/bundles/platform-browser-animations.umd.js",
  },
});

Sparky.task("serve.dev.spa", () => {
  fuse.dev({ port: app.server.port });
  fuse.bundle('js/vendor').hmr().instructions(' ~ client/main.ts');
  fuse.bundle('js/app')
    .sourceMaps(true)
    .instructions(' !> [client/main.ts]')
    .watch()
    .hmr();
  fuse.run()
});

Sparky.task("serve.dev.universal", () => {
  fuse.dev({ httpServer: false });
  fuse.bundle('js/vendor').instructions(' ~ client/main.ts').watch();
  fuse.bundle("js/app").instructions(" !> [client/main.ts]").watch()
  fuse.bundle("server").instructions(" > [server/server.ts]")
    .watch()
    .completed(proc => proc.start())
  fuse.run()
});
