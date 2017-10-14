import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => Sparky.src('./assets/**/!(favicon).*', { base: `./${BUILD_CONFIG.assetParentDir}` })
  .dest(`./${BUILD_CONFIG.outputDir}`))
