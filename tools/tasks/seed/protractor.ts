import { Sparky } from 'fuse-box';
import { protractor } from 'protractor';
import { taskName } from '../../config/build.config';

Sparky.task(taskName(__filename), () => {
  protractor.ProtractorBrowser();
});
