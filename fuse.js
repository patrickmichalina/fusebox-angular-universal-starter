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

// const fuse = FuseBox.init({
//   homeDir: `src/`,
//   output: `dist/$name.js`,
//   plugins: [
//     Ng2TemplatePlugin(),
//     ['*.component.html', RawPlugin()],
//     ['*.component.scss', SassPlugin({ outputStyle: 'compressed', sourceMap: false }), RawPlugin()],
//     [SassPlugin({ outputStyle: 'compressed', sourceMap: false }), CSSPlugin()],

//     TypeScriptHelpers(),
//     JSONPlugin(),
//     HTMLPlugin({
//       useDefault: false,
//     })
//   ]
// });

// Basic Development Server
Sparky.task("default", () => {
  fuse.dev({ port: 4445 });
  fuse.bundle('vendor').hmr().instructions(' ~ main.ts');
  fuse.bundle('app')
    .sourceMaps(true)
    .instructions(' !> [main.ts]')
    .watch()
    .hmr();
  fuse.run()
});

Sparky.task("build.prod", () => {
  let fuse = FuseBox.init({
    homeDir: `src/`,
    output: `dist/$name.js`,
    plugins: [
      Ng2TemplatePlugin(),
      ['*.component.html', RawPlugin()],
      ['*.component.scss', SassPlugin({ outputStyle: 'compressed', sourceMap: false }), RawPlugin()],
      [SassPlugin({ outputStyle: 'compressed', sourceMap: false }), CSSPlugin()],
      WebIndexPlugin({
        title: 'FuseBox + Angular',
        template: 'src/client/index.html',
        path: 'js'
      }),
      TypeScriptHelpers(),
      JSONPlugin(),
      HTMLPlugin({
        useDefault: false,
      })
    ]
  });
  fuse.bundle('js/vendor').instructions(' ~ client/main.ts');
  fuse.bundle("js/app").instructions(" !> [client/main.ts]")
  fuse.run()
});

Sparky.task("build", () => {
 let fuse = FuseBox.init({
    homeDir: `src/`,
    output: `dist/$name.js`,
    plugins: [
      Ng2TemplatePlugin(),
      ['main.scss', CSSResourcePlugin(), CSSPlugin()],
      ['*.component.html', RawPlugin()],
      ['*.component.scss', SassPlugin({ outputStyle: 'compressed', sourceMap: false }), RawPlugin()],
      [SassPlugin({ outputStyle: 'compressed', sourceMap: false }), CSSPlugin()],
      TypeScriptHelpers(),
      WebIndexPlugin({
        title: 'FuseBox + Angular',
        template: 'src/client/index.html',
        path: 'js',
        bundles: ['js/vendor', 'js/app']
      }),
      
      JSONPlugin(),
      HTMLPlugin({
        useDefault: false,
      })
    ]
  });
  fuse.bundle('js/vendor').instructions(' ~ client/main.ts');
  fuse.bundle("js/app").instructions(" !> [client/main.ts]")
  fuse.bundle("server").instructions(" > [server/server.ts]")
  fuse.run()
});

Sparky.task("serve.prod", () => {
  fuse.dev({ port: 4445 });
  fuse.bundle('vendor').plugin(UglifyESPlugin()).instructions(' ~ main.ts');
  fuse.bundle("app").plugin(UglifyESPlugin()).instructions(" !> [main.ts]")
  fuse.run()
});