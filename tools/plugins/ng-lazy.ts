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
  isUniversalServer?: boolean;
}

export class NgLazyPluginClass {
  public dependencies: ["hash-files"];
  public test: RegExp = /(routing|app.browser.module.ngfactory|app.module.ngfactory)/;
  private moduleMap: any = {};

  getDirDeep(context: WorkFlowContext, parentPath: string, lazyPrefix = '+', dirIgnoreRegex: RegExp = new RegExp('__snapshots__'),
    componentSuffix = 'component.ts', outDir = 'js') {

    context.bundle.splitConfig({ dest: `${outDir}/modules/` })

    const getName = (str: string) => (str.split('/').pop() || '')
    const replaceBackSlash = (str: string) => (str.replace(/\\/g, "/"))
    

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
          .map(d => getName(replaceBackSlash(d)))
          .join('|')

        //path = path + '\\';

        path = replaceBackSlash(path);

        console.log("path is "+path)

        const moduleName = getName(path)

        console.log("module name is "+moduleName)
        

        const hash = hashFiles.sync({ files: resolve(path, '**') });

        console.log("hash is "+hash)

        parentPath = replaceBackSlash(parentPath);

        context.homeDir = replaceBackSlash(context.homeDir);
        
        console.log("parentPath is "+parentPath + " and context.homeDir "+context.homeDir);

        const relativeBasePath = `${parentPath.replace(`${context.homeDir}/`, '')}/${moduleName}`
        
        console.log("relative base path is "+ relativeBasePath)
        
        const relativeModulePath = `${relativeBasePath}/${moduleName.replace(lazyPrefix, '')}.module`
        
        console.log("relative module path is "+ relativeModulePath)
        
        
        const entryPoint = `client/app/${moduleName}/${moduleName.replace(lazyPrefix, '')}.module.ts`

        console.log("entryPoint is "+ entryPoint)
        

        this.moduleMap[`~/${relativeModulePath}`] = `${hash}.js`;

        console.log("this.moduleMap[`~/${relativeModulePath}`] is "+ this.moduleMap[`~/${relativeModulePath}`])

        console.log("relativeDirs are "+relativeDirs);

        if (relativeDirs) {
          context.bundle.split(`${relativeBasePath.replace(moduleName, `(${moduleName}|${relativeDirs})/**`)}`, `${hash} > ${entryPoint}`)
          console.log("true")
        } else {
          console.log("false")          
          context.bundle.split(`${relativeBasePath}/**`, `${hash} > ${entryPoint}`)
        }

        console.log("context is "+context)

        console.log("==============================================================================")

        this.getDirDeep(context, path)
      })
  }

  constructor(private options: NgLazyPluginOptions = {}) {
    if (!options.angularAppRoot) throw new Error("");
    if (!options.angularBundle) throw new Error("");
    if (!options.lazyFolderMarker) options.lazyFolderMarker = '+';
  }

  public bundleStart(context: WorkFlowContext) {
    if (this.options.isUniversalServer) {
      this.moduleMap = JSON.parse(process.env.UNIMODMAP)
      return
    }
    if (context.bundle.name === this.options.angularBundle) {
      this.getDirDeep(context, `${context.appRoot}/${this.options.angularAppRoot}`)
      process.env.UNIMODMAP = JSON.stringify(this.moduleMap)
    }
  }

  public transform(file: File) {
    file.loadContents();

    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, (match: string, f: string) => {
      const pathComponents = f.split('#')
      const moduleRef = pathComponents[1];
      const modulePath = pathComponents[0];
      const moduleLoaderPath = `./js/modules/${this.moduleMap[modulePath]}`

      return `loadChildren: function() { return new Promise(function (resolve, reject) {
          return FuseBox.exists('${modulePath}')
            ? resolve(require('${modulePath}')['${moduleRef}'])
            : FuseBox.import('${moduleLoaderPath}', function (loaded) { 
              return loaded 
                ? resolve(require('${modulePath}')['${moduleRef}']) 
                : reject('failed to load ${moduleRef}')})})}`;
    });
  }
}

export const NgLazyPlugin = (options: NgLazyPluginOptions = {}) => new NgLazyPluginClass(options);
