import { Sparky } from 'fuse-box';
import { BUILD_CONFIG } from '../config/build.config';

Sparky.task('assets', () => Sparky.src('./assets/**/!(favicon).*', { base: `./${BUILD_CONFIG.assetParentDir}` })
  .dest(`./${BUILD_CONFIG.outputDir}`));
