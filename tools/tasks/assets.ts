import { Sparky } from 'fuse-box';
import { BuildConfig } from '../config/build.config';

Sparky.task("assets", () => Sparky.src(`./assets/**/!(favicon).*`, { base: `./${BuildConfig.assetParentDir}` }).dest(`./${BuildConfig.outputDir}`));