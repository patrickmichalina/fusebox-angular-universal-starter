import './clean';
import './assets';
import './web';
import './sass';
import './sass.files';
import './js.files';

import { Sparky } from 'fuse-box';
import { config } from '../config';

Sparky.task("index", () => Sparky.src(`./index.html`, { base: `./src/client` }).dest(`./${config.outputDir}`));