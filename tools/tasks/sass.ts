import { Sparky } from 'fuse-box';
import { isProd } from './_global';
import { renderSync } from 'node-sass';
import { writeFileSync } from 'fs';
import { sync as mkdirp } from 'mkdirp';

Sparky.task('sass', () => {
  const src = Sparky.src('./src/client/styles/main.scss').file('main.scss', () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    });
    mkdirp('./dist/css');
    writeFileSync('./dist/css/main.css', result.css, (err: any) => {
      // tslint:disable-next-line:no-console
      if (err) return console.log(err);
    });
  });

  if (!isProd && !process.env.CI) src.watch(['./src/client/styles/**/*.scss']);

  return src;
});
