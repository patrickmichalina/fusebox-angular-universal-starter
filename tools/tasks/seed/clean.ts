import { Sparky } from 'fuse-box';
import { BUILD_CONFIG } from '../../config/build.config';

Sparky.task('clean', () => Sparky.src(`${BUILD_CONFIG.outputDir}`)
  .clean(`${BUILD_CONFIG.outputDir}`)
  .clean('.ngc')
  .clean('src/client/.aot'));
