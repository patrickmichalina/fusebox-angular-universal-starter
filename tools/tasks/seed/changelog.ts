import { Sparky } from 'fuse-box'
import { taskName } from '../../config/build.config'
import { sync as mkdirp } from 'mkdirp'
import { BUILD_CONFIG } from '../../config/build.config'
import { createWriteStream } from 'fs'
const conventionalChangelog = require('conventional-changelog')

Sparky.task(taskName(__filename), () => {
  mkdirp(BUILD_CONFIG.outputDir);

  return conventionalChangelog({
    preset: 'angular',
    releaseCount: 0
  }).pipe(createWriteStream(`./${BUILD_CONFIG.outputDir}/CHANGELOG.md`))
})