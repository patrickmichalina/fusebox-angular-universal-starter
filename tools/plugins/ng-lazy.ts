import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
import { File } from 'fuse-box/src/core/File';
import { lstatSync, readdirSync } from 'fs';
import { basename, resolve } from 'path';
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

  constructor(private options: NgLazyPluginOptions = {}) {
    if (!options.angularAppRoot) throw new Error("");
    if (!options.angularBundle) throw new Error("");
    if (!options.lazyFolderMarker) options.lazyFolderMarker = '+';
  }

  public bundleStart(context: WorkFlowContext) {
    if (context.bundle.name === this.options.angularBundle) {

      readdirSync(resolve(`${context.appRoot}/${this.options.angularAppRoot}`)).forEach(file => {
        const lstat = lstatSync(resolve(`${context.appRoot}/${this.options.angularAppRoot}`, file));
        if (lstat.isDirectory()) {
          const dirName = basename(file);

          const compSuffix = this.options.aot ? 'component.ngfactory.ts' : 'component.ts';
          const relative = this.options.aot ? 'client/.aot/src/client/app' : 'client/app';

          if (dirName[0] === this.options.lazyFolderMarker) {
            const moduleName = dirName.substring(1);

            this.checksums[moduleName] = hashFiles.sync({
              files: resolve(this.options.angularAppRoot, file, '**')
            });

            const bundlePath = this.options.isProdBuild
              ? `js/bundle-${this.checksums[moduleName]}-${moduleName}.module.js`
              : `js/bundle-${moduleName}.module.js`;

            context.bundle.split(`${relative}/${dirName}/**`, `${bundlePath} > ${relative}/${dirName}/${moduleName}.${compSuffix}`);
          }
        }
      });
    }
  }

  public transform(file: File) {
    file.loadContents();

    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, (match: string, f: string) => {
      const modulePath = this.options.aot ? `~/client/.aot/src/${f.split('#')[0].replace('~/', '')}` : f.split('#')[0];
      const moduleName = this.options.aot ? `${f.split('#')[1]}NgFactory` : f.split('#')[1];
      const moduleLoaderPath = this.options.aot ? `${modulePath}.ngfactory` : `${modulePath}`;
      const name = modulePath.split('.module')[0].split('/').pop() as string;

      const bundlePath = this.options.isProdBuild
        ? `./js/bundle-${this.checksums[name]}-${name}.module.js`
        : `./js/bundle-${name}.module.js`

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