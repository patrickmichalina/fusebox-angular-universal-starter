import { Sparky } from 'fuse-box'
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => Sparky.src(`${BUILD_CONFIG.toolsDir}/config/console.banner.256.txt`)
  .file('console.banner.256.txt', (file: SparkyFile) => {
    file.read()
    console.log(file.contents.toString())
  }))
