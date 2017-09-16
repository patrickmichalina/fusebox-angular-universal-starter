import { Sparky } from 'fuse-box';
import { isProdBuild, isBuildServer } from '../../config/build.config';
import { renderSync } from 'node-sass';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { sync as mkdirp } from 'mkdirp';
import { taskName } from '../../config/build.config';
import hash = require('string-hash');
import { sync as glob } from 'glob';
import { ConfigurationTransformer } from '../../plugins/web-index';

Sparky.task(taskName(__filename), () => {
  let src;
  mkdirp('./dist/css');
  
  const sass = () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    });
    const hashed = hash(result.css.toString())

    return {
      css: result.css,
      hashed
    }
  }

  const process = () => {
    const _sass = sass()

    glob('./dist/css/main-*').forEach(file => unlinkSync(file))
    writeFileSync(`./dist/css/main-${_sass.hashed}.css`, _sass.css);

    const indexPath = './dist/index.html'
    const index = readFileSync(indexPath)
    const transformer = new ConfigurationTransformer();
    const html = transformer.applyTransform([{
      inHead: true,
      order: 1,
      element: 'link',
      attributes: {
        id: 'primary-styles',
        rel: 'stylesheet',
        href: `/css/main-${_sass.hashed}.css`
      }
    }], index.toString());
    writeFileSync(indexPath, html);
  }

  if (isProdBuild || isBuildServer) {
    src = Sparky.src('src/client/styles/**/**/*.scss').file('main.scss', () => process());
  } else {
    src = Sparky.watch('src/client/styles/**/**/*.scss').file('main.scss', () => process());
  }

  return src;
});
