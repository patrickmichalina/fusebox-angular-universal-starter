import { Sparky } from 'fuse-box';
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile';
import { BUILD_CONFIG } from '../../config/build.config';

Sparky.task('banner', () => Sparky.src(`${BUILD_CONFIG.toolsDir}/config/console.banner.256.txt`).file('console.banner.256.txt', (file: SparkyFile) => {
  file.read();
  console.log(file.contents.toString());
}));
