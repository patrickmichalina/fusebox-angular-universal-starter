import { Sparky } from 'fuse-box'
import { taskName, ENV_CONFIG_INSTANCE } from '../../config/build.config'
import { writeFileSync } from 'fs'

Sparky.task(taskName(__filename), () => {
  writeFileSync('./src/config.json', JSON.stringify(ENV_CONFIG_INSTANCE, undefined, 2), { encoding: 'utf-8' })
})
