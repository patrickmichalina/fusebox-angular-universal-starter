import { WorkFlowContext } from 'fuse-box/src/core/WorkflowContext';
const pwaManifest = require('@pwa/manifest')

export interface PwaFusedPluginOptions {
  distPath?: string,
  manifest?: {
    name?: string
    short_name?: string
    lang?: string
    start_url?: string
    display?: string,
    theme_color?: string,
    background_color?: string
    orientation?: string
  }
}

export class PwaFusedPluginClass {
  public dependencies = ['@pwa/manifest']

  constructor(private opts: PwaFusedPluginOptions = {}) {
    this.opts = {
      distPath: 'dist',
      manifest: {
        name: 'Fusebox Angular Universal Starter',
        short_name: 'Angular Universal',
        lang: 'en',
        start_url: '/',
        display: 'standalone',
        theme_color: '#FFFFFF',
        background_color: '#3F51B5',
        orientation: 'natural'
      },
      // ...opts,
    } as PwaFusedPluginOptions
  }

  public preBundle(context: WorkFlowContext) {
    if (context.bundle) {
      pwaManifest(this.opts.manifest).then((manifest: any) => {
        pwaManifest.write(this.opts.distPath || `${context.appRoot}/${this.opts.distPath}`, manifest);
      });
    }
  }
}

export const PwaFusedPlugin = (options?: PwaFusedPluginOptions) => new PwaFusedPluginClass(options);