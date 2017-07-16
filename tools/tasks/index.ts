import './clean';
import './assets';
import './web';
import './sass';
import './sass.files';
import './js.files';
import './favicons';
import './index.minify';
import './ngc';

import { Sparky } from 'fuse-box';
import { BUILD_CONFIG } from '../config/build.config';

Sparky.task('index', () => Sparky.src('./index.html', { base: './src/client' }).dest(`./${BUILD_CONFIG.outputDir}`));
