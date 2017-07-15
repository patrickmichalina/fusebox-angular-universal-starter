import { Sparky } from 'fuse-box';
import { main as ngc } from '@angular/compiler-cli/src/main';

Sparky.task('ngc', () => {
  return ngc({ p: 'tsconfig-aot.json'});
});
