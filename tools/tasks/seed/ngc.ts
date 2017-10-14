import { Sparky } from 'fuse-box'
import { main as ngc } from '@angular/compiler-cli/src/main'
import { taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => {
  return ngc(['tsconfig-aot.json'])
})
