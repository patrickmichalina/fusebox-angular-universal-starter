import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => {
  return Sparky.src(['ngsw-worker.js'], { base: './node_modules/@angular/service-worker' }).dest(`./${BUILD_CONFIG.outputDir}`)
})
