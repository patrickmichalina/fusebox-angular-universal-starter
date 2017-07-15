import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
import { File } from 'fuse-box/src/core/File';

export interface NgAotPluginOptions {

}

export class NgAotPluginClass {
  public test: RegExp = /.ts/;

  constructor(private options: NgAotPluginOptions = {}) { }

  public init(context: WorkFlowContext) {

  }

  public transform(file: File) {
    file.loadContents();
  }
}

export const NgLazyPlugin = (options: NgAotPluginOptions = {}) => new NgAotPluginClass(options);
