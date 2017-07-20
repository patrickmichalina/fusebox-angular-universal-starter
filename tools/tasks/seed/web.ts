import { Sparky } from 'fuse-box';
import { BUILD_CONFIG } from '../../config/build.config';

Sparky.task('web', () => Sparky.src('./**', { base: `${BUILD_CONFIG.toolsDir}/web` }).dest(`./${BUILD_CONFIG.outputDir}`));
