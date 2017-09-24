import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
import { File } from 'fuse-box/src/core/File';
import { lstatSync, readdirSync } from 'fs';
import { resolve } from 'path';
import * as hashFiles from 'hash-files';

export interface NgLazyPluginOptions {
  cdn?: string;
  angularAppEntry?: string,
  angularBundle?: string;
  angularAppRoot?: string;
  lazyFolderMarker?: string;
  aot?: boolean;
  isProdBuild?: boolean;
}

export class NgLazyPluginClass {
  public dependencies: ["hash-files"];
  public test: RegExp = /(routing|app.browser.module.ngfactory|app.module.ngfactory)/;
  private checksums: any = {};

  getDirDeep(context: WorkFlowContext, parentPath: string, lazyPrefix = '+', dirIgnoreRegex: RegExp = new RegExp('__snapshots__'),
    componentSuffix = 'component.ts') {
    const getName = (str: string) => (str.split('/').pop() || '')

    readdirSync(resolve(parentPath))
      .filter(dir => dir.includes(lazyPrefix))
      .map(dir => resolve(parentPath, dir))
      .filter(path => lstatSync(path).isDirectory())
      .forEach(path => {
        const relativeDirs = readdirSync(path)
          .filter(d => !d.includes(lazyPrefix))
          .map(dir => resolve(path, dir))
          .filter(d => lstatSync(d).isDirectory())
          .filter(d => !dirIgnoreRegex.test(d))
          .map(d => getName(d))
          .join('|')

        const moduleName = getName(path)
        const relative = `${parentPath.replace(`${context.homeDir}/`, '')}/${getName(path)}`
        const moduleAlias = relative.replace('client/app/', '')
        const entryPoint = `${relative}/${moduleName}.${componentSuffix}`
        const modulePath = moduleAlias.split('/').length <= 1 
          ? `js/${moduleName}/${moduleAlias}`
          : `js/${moduleAlias}.module.js`;

        this.checksums[moduleAlias] = hashFiles.sync({
          files: resolve(this.options.angularAppRoot, path, '**')
        });

        if (relativeDirs) {
          context.bundle.split(`${relative}/${moduleName}|${relativeDirs}/**`, `/${modulePath} > ${entryPoint}`)
        } else {
          context.bundle.split(`${relative}/**`, `/${modulePath} > ${entryPoint}`)
        }

        this.getDirDeep(context, path)
      })
  }

  constructor(private options: NgLazyPluginOptions = {}) {
    if (!options.angularAppRoot) throw new Error("");
    if (!options.angularBundle) throw new Error("");
    if (!options.lazyFolderMarker) options.lazyFolderMarker = '+';
  }

  public bundleStart(context: WorkFlowContext) {
    if (context.bundle.name === this.options.angularBundle) {
      this.getDirDeep(context, `${context.appRoot}/${this.options.angularAppRoot}`)
      // console.log(this.checksums)
    }
  }

  public transform(file: File) {
    file.loadContents();

    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, (match: string, f: string) => {
      
      const pathComponents = f.split('#')
      const moduleRef = pathComponents[1];
      const modulePath = pathComponents[0].replace('~/client/app/', '');
      const moduleLoaderPath = `js/${modulePath}`;
      // const checksumKey = modulePath.replace('.module', '');
    
    
      // console.log(modulePath)
     
     
     
      // const bundlePath = this.options.isProdBuild
      //   ? `./js/${this.checksums[checksumKey]}-${checksumKey}.module.js`
      //   : `./js/${moduleRef}.module.js`

      return `loadChildren: function() { return new Promise(function (resolve, reject) {
          return FuseBox.exists('${moduleLoaderPath}')
            ? resolve(require('${moduleLoaderPath}')['${moduleRef}'])
            : FuseBox.import('${moduleLoaderPath}.js', (loaded) => 
              loaded 
                ? resolve(require('${moduleLoaderPath}')['${moduleRef}']) 
                : reject('failed to load ${moduleRef}'))})}`;
    });
  }
}

export class NgLazyServerPluginClass {
  public dependencies: ["hash-files"];
  public test: RegExp = /(routing|app.browser.module.ngfactory|app.module.ngfactory)/;
  private checksums: any = {};

  constructor(private options: NgLazyPluginOptions = {}) {
    if (!options.angularAppRoot) throw new Error("");
    if (!options.angularBundle) throw new Error("");
    if (!options.lazyFolderMarker) options.lazyFolderMarker = '+';
  }

  public bundleStart(context: WorkFlowContext) {
    readdirSync(resolve('dist/js')).filter(filename => filename.includes('bundle') && !filename.includes('.map'))
      .forEach(filename => {
        if (this.options.isProdBuild) {
          const name = filename.split('-').slice(2).reduce((acc, val) => `${acc}-${val}`)
          this.checksums[name.split('.')[0]] = filename;
        } else {
          const name = filename.split('-').slice(1).reduce((acc, val) => `${acc}-${val}`)
          this.checksums[name.split('.')[0]] = filename;
        }
      });
  }

  public transform(file: File) {
    file.loadContents();

    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, (match: string, f: string) => {
      const modulePath = this.options.aot ? `~/client/.aot/src/${f.split('#')[0].replace('~/', '')}` : f.split('#')[0];
      const moduleName = this.options.aot ? `${f.split('#')[1]}NgFactory` : f.split('#')[1];
      const moduleLoaderPath = this.options.aot ? `${modulePath}.ngfactory` : `${modulePath}`;
      const name = modulePath.split('.module')[0].split('/').pop() as string;

      const bundlePath = `./js/${this.checksums[name]}`

      return `loadChildren: function() { return new Promise(function (resolve, reject) {
          return FuseBox.exists('${moduleLoaderPath}')
            ? resolve(require('${moduleLoaderPath}')['${moduleName}'])
            : FuseBox.import('${bundlePath}', (loaded) => 
              loaded 
                ? resolve(require('${moduleLoaderPath}')['${moduleName}']) 
                : reject('failed to load ${moduleName}'))})}`;
    });
  }
}

export const NgLazyPlugin = (options: NgLazyPluginOptions = {}) => new NgLazyPluginClass(options);
export const NgLazyServerPlugin = (options: NgLazyPluginOptions = {}) => new NgLazyServerPluginClass(options);