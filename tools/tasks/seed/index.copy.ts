import { Sparky } from 'fuse-box';
import { BUILD_CONFIG } from '../../config/build.config';

Sparky.task('index.copy', () => Sparky.src('./index.html', { base: './src/client' }).dest(`./${BUILD_CONFIG.outputDir}`));
