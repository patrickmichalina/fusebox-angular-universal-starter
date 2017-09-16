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
  const src = Sparky.watch('src/client/styles/**/**/*.scss').file('main.scss', () => {
    mkdirp('./dist/css');

    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    });
    const hashed = hash(result.css.toString())

    glob('./dist/css/main-*').forEach(file => unlinkSync(file))
    writeFileSync(`./dist/css/main-${hashed}.css`, result.css);

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
        href: `/css/main-${hashed}.css`
      }
    }], index.toString());
    writeFileSync(indexPath, html);
  });

  if (isProdBuild || isBuildServer) src.stopWatching()

  return src;
});
