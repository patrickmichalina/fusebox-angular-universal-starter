import { File } from 'fuse-box/src/core/File';

export class RemoveSourceMapPluginClass {
  public test: RegExp = /.ts/;

  public transform(file: File) {
    console.log(file.absPath)
    file.loadContents();
    file.contents.replace(/.*sourceMappingURL.*/, (match: string, a: string) => {
      console.log(match);
      return '';
    });
  }
}

export const RemoveSourceMapPlugin = () => new RemoveSourceMapPluginClass();
