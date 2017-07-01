import { Sparky } from 'fuse-box';
import { config } from '../config';

Sparky.task("web", () => Sparky.src(`./**`, { base: `./tools/web` }).dest(`./${config.outputDir}`));