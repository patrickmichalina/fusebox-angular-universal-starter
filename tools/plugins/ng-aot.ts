import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
import { File } from 'fuse-box/src/core/File';

import { } from '@angular/angular-cli'

export interface NgAotPluginOptions {

}

export class NgAotPluginClass {
  public test: RegExp = /.ts/;

  constructor(options: NgAotPluginOptions = {}) {
    console.log(options);
  }

  public init(context: WorkFlowContext) {

  }

  public transform(file: File) {
    file.loadContents();
  }
}

export const NgLazyPlugin = (options: NgAotPluginOptions = {}) => new NgAotPluginClass(options);
