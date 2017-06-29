import { Sparky } from 'fuse-box';
import { config } from '../config';

Sparky.task("robots", () => Sparky.src(`./robots.txt`, { base: `./tools/web` }).dest(`./${config.outputDir}`));