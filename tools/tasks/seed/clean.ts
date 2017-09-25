import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () =>
  Sparky.src(`${BUILD_CONFIG.outputDir}`)
    .clean(`${BUILD_CONFIG.outputDir}`)
    .clean('.fusebox')
    .clean('.ngc')
    .clean('src/client/.aot'))
