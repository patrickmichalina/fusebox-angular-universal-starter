import { Dependency } from '../plugins/web-index'
import jsdom = require("jsdom")

export interface BuildConfiguration {
  dependencies: Dependency[]
  baseHref: string
  faviconSource: string
  outputDir: string
  sourceDir: string
  prodOutDir: string
  assetParentDir: string
  minifyIndex: boolean
  skipFaviconGenerationOnDev: boolean
  toolsDir: string
  browserSyncPort: number
  host: string
  port: number
}

export interface IConfigurationTransformer {
  apply(dependencies: Dependency[], document?: string): jsdom.JSDOM
}
