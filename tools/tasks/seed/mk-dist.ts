import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, taskName } from '../../config/build.config'
import { sync as mkdirp } from 'mkdirp'

Sparky.task(taskName(__filename), () => {
  mkdirp(BUILD_CONFIG.outputDir)
})
