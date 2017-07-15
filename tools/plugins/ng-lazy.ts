import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
import { File } from 'fuse-box/src/core/File';

export interface NgLazyPluginOptions {
  cdn?: string;
}

export class NgLazyPluginClass {
  public test: RegExp = /routing/;
  private checksums: any;

  constructor(private options: NgLazyPluginOptions = {}) { }

  public init(context: WorkFlowContext) {
    this.checksums = (context.plugins[0] as any).env.lazyBuster; // TODO: super risky
  }

  public transform(file: File) {
    file.loadContents();
    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, (match: string, a: string) => {
      const modulePath = a.split('#')[0];
      const moduleName = a.split('#')[1];
      const moduleLoaderPath = `${modulePath}.js`;
      const name = modulePath.split('.module')[0].split('/').pop() as string;

      const checksum = this.checksums[name];

      let bundlePath = `./js/bundle-${checksum}-${name}.module.js`;

      if (this.options.cdn) {
        bundlePath = `${this.options.cdn}/js/bundle-${checksum}-${name}.module.js`;
      }

      return `loadChildren: function() { return new Promise(function (resolve, reject) {
      return FuseBox.exists('${moduleLoaderPath}')
        ? resolve(require('${moduleLoaderPath}')['${moduleName}'])
        : FuseBox.import('${bundlePath}', (loaded) => loaded 
          ? resolve(require('${moduleLoaderPath}')['${moduleName}']) 
          : reject('Unable to load module ${moduleName} from ./js/bundle-${moduleName}.module.js'))})}`;
    });
  }
}

export const NgLazyPlugin = (options: NgLazyPluginOptions = {}) => new NgLazyPluginClass(options);
