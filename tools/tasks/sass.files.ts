import { sync as glob } from 'glob';
import { Sparky } from 'fuse-box';
import { ConfigurationTransformer } from '../config/build.transformer';
import { Dependency, DependencyType, SourceType } from '../config/build.interfaces';

Sparky.task("sass.files", () => {
  const css = glob('./dist/css/**/*.css').map((a: string) => a.replace('./dist', ''));
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    
    const transformer = new ConfigurationTransformer();
    const deps: Dependency[] = css.map(fileName => {
      return {
        preloaded: true,
        order: 1,
        type: DependencyType.Stylesheet,
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
