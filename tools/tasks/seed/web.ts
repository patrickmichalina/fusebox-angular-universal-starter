import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () =>
  Sparky.src('**', { base: `${BUILD_CONFIG.toolsDir}/web` })
    .dest(`./${BUILD_CONFIG.outputDir}`))
