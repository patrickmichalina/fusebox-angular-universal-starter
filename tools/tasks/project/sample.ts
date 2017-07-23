import { Sparky } from 'fuse-box';
import { taskName } from '../../config/build.config';


// An example task stub
Sparky.task(taskName(__filename), () => {
  console.log('Sample Task!')
});