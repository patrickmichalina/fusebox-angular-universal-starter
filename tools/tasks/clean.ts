import { Sparky } from 'fuse-box';
import { config } from '../config';

Sparky.task("clean", () => Sparky.src(`${config.outputDir}`).clean(`${config.outputDir}`));
