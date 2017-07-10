import { Sparky } from 'fuse-box';
import { protractor } from 'protractor';

Sparky.task("protractor", () => {
  protractor.ProtractorBrowser()

});
