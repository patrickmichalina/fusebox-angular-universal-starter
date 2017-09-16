import { Dependency } from '../plugins/web-index'

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
