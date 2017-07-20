import { Sparky } from 'fuse-box';
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile';
import { sync as glob } from 'glob';
import { ConfigurationTransformer } from '../../config/build.transformer';
import { Dependency, DependencyType, SourceType } from '../../config/build.interfaces';
import { readFileSync } from 'fs';
import hash = require('string-hash');

Sparky.task('js.files', () => {
  const js = glob('./dist/js/**/!(bundle-*|server).js').map(a => {
    return {
      hash: hash(readFileSync(a).toString()),
      name: a.replace('./dist', '')
    };
  });

  return Sparky.src('./dist/index.html').file('index.html', (file: SparkyFile) => {
    file.read();

    const transformer = new ConfigurationTransformer();
    const deps: Dependency[] = js.map(j => {
      return {
        preloaded: false,
        order: 1,
        type: DependencyType.Script,
        source: {
          type: SourceType.RelativeLink,
          link: `${j.name}`
        }
      } as Dependency;
    });

    const dom = transformer.apply(deps, file.contents.toString());
    file.setContent(dom.serialize());

    file.save();
  });
});
