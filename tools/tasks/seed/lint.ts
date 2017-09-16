import { Sparky } from 'fuse-box'
import { taskName, typeHelper } from '../../config/build.config'

Sparky.task(taskName(__filename), () => typeHelper())
