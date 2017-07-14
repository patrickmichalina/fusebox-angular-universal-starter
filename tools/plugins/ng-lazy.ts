import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
import { File } from 'fuse-box/src/core/File';

export class NgLazypluginClass {
  public test: RegExp = /routing/;
  private checksums: any;
  public init(context: WorkFlowContext) {
    this.checksums = (<any>context.plugins[0]).env.lazyBuster;
  }

  public transform(file: File) {
    file.loadContents();
    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, (match: string, a: string) => {
      const modulePath = a.split('#')[0];
      const moduleName = a.split('#')[1];
      const moduleLoaderPath = `${modulePath}.js`;
      const name = modulePath.split('.module')[0].split('/').pop() as string;

      const checksum = this.checksums[name];

      return `loadChildren: function() { return new Promise(function (resolve, reject) {
      return FuseBox.exists('${moduleLoaderPath}')
        ? resolve(require('${moduleLoaderPath}')['${moduleName}'])
        : FuseBox.import('./js/bundle-${checksum}-${name}.module.js', (loaded) => loaded 
          ? resolve(require('${moduleLoaderPath}')['${moduleName}']) 
          : reject('Unable to load module ${moduleName} from ./js/bundle-${moduleName}.module.js'))})}`;
    });
    file.contents.replace(/.*sourceMappingURL.*/, '');
  }
}

export const NgLazyplugin = () => new NgLazypluginClass();
