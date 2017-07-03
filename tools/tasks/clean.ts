import { Sparky } from 'fuse-box';
import { BuildConfig } from '../config/build.config';

Sparky.task("clean", () => Sparky.src(`${BuildConfig.outputDir}`).clean(`${BuildConfig.outputDir}`));
