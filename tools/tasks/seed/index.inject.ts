import { Sparky } from 'fuse-box';
import { BUILD_CONFIG, isBuildServer, cdn, taskName } from '../../config/build.config';
import { ConfigurationTransformer } from '../../config/build.transformer';
import { prefixByQuery } from '../../scripts/replace';

Sparky.task(taskName(__filename), () => {
  return Sparky.src('./dist/index.html').file('index.html', (file: any) => {
    file.read();
    const transformer = new ConfigurationTransformer();
    const dom = transformer.apply(BUILD_CONFIG.dependencies, file.contents.toString('utf8'));
    file.setContent(dom.serialize());
    if (isBuildServer && cdn) {
      file.setContent(prefixByQuery(file.contents, 'script[src]', 'src', cdn));
      file.setContent(prefixByQuery(file.contents, 'link', 'href', cdn));
    }
    file.save();
  });
});