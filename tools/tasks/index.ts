import './clean';
import './assets';
import './web';
import './sass';
import './sass.files';
import './js.files';
import './favicons';
import './index.minify';

import { Sparky } from 'fuse-box';
import { BuildConfig } from '../config/build.config';

Sparky.task("index", () => Sparky.src(`./index.html`, { base: `./src/client` }).dest(`./${BuildConfig.outputDir}`));