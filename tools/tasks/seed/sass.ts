import { Sparky } from 'fuse-box';
import { isProdBuild, isBuildServer } from '../../config/build.config';
import { renderSync } from 'node-sass';
import { writeFileSync } from 'fs';
import { sync as mkdirp } from 'mkdirp';
import { taskName } from '../../config/build.config';
import hash = require('string-hash');

Sparky.task(taskName(__filename), () => {
  const src = Sparky.src('./src/client/styles/main.scss').file('main.scss', () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    });
    mkdirp('./dist/css');
    writeFileSync(`./dist/css/main-${hash(result.css.toString())}.css`, result.css, (err: any) => {
      // tslint:disable-next-line:no-console
      if (err) return console.log(err);
    });
  });

  if (!isProdBuild && !isBuildServer) src.watch(['./src/client/styles/**/*.scss']);

  return src;
});
