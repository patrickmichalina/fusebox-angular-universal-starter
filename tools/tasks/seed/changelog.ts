import { Sparky } from 'fuse-box'
import { taskName } from '../../config/build.config'
import { BUILD_CONFIG } from '../../config/build.config'
import { createWriteStream } from 'fs'
const conventionalChangelog = require('conventional-changelog')

Sparky.task(taskName(__filename), () => {
  // heroku does not clone the git repo, so no meta data can be found :(
  if (process.env.HEROKU) return Promise.resolve()

  return conventionalChangelog({
    preset: 'angular',
    releaseCount: 0
  }).pipe(createWriteStream(`./${BUILD_CONFIG.outputDir}/CHANGELOG.md`))
})