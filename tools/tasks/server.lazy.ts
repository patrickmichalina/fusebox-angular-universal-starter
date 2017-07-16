import { Sparky } from 'fuse-box';
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile';

Sparky.task('server.lazy', () => {
  return Sparky.src('./dist/server.js').file('server.js', (file: SparkyFile) => {
    file.read();
    file.contents.toString().replace('https://angularmichalina-8724.kxcdn.com', '');

    file.save();
  });
});
