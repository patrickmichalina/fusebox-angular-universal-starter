import { Sparky } from 'fuse-box'
import { taskName } from '../../config/build.config'
import { sync as mkdirp } from 'mkdirp'
import { BUILD_CONFIG } from '../../config/build.config'

Sparky.task(taskName(__filename), () => {
  mkdirp(BUILD_CONFIG.outputDir);
})