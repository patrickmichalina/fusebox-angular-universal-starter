import { Sparky } from 'fuse-box';
import { BuildConfig } from '../config/build.config';

Sparky.task("web", () => Sparky.src(`./**`, { base: `./tools/web` }).dest(`./${BuildConfig.outputDir}`));