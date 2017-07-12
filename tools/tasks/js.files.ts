import { Sparky } from 'fuse-box';
import { sync as glob } from 'glob';
import { ConfigurationTransformer } from '../config/build.transformer';
import { Dependency, DependencyType, SourceType } from '../config/build.interfaces';

Sparky.task("js.files", () => {
  const js = glob('./dist/js/**/*(!bundle-*).js').map((a: string) => a.replace('./dist', ''));

  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();

    const transformer = new ConfigurationTransformer();
    const deps: Dependency[] = js.map(fileName => {
      return {
        preloaded: false,
        order: 1,
        type: DependencyType.Script,
        source: {
          type: SourceType.RelativeLink,
          link: fileName,
        }
      } as Dependency
    });

    const dom = transformer.apply(deps, file.contents.toString('utf8'));
    file.setContent(dom.serialize());

    file.save();
  });
});
