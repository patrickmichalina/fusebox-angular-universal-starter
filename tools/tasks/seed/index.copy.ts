import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => Sparky.src('./index.html', { base: './src/client' }).dest(`./${BUILD_CONFIG.outputDir}`))
