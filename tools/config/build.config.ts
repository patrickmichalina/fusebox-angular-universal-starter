import { BuildConfiguration } from './build.interfaces'
import { argv } from 'yargs'
import { basename } from 'path'
import { OVERRIDES } from './build.ci.replace'

export const BUILD_CONFIG: BuildConfiguration = {
  baseHref: '/',
  faviconSource: './src/client/assets/favicon.png',
  outputDir: 'dist',
  sourceDir: 'src',
  prodOutDir: './dist/prod',
  assetParentDir: 'src/client',
  toolsDir: './tools',
  minifyIndex: true,
  skipFaviconGenerationOnDev: true,
  browserSyncPort: 8000,
  host: 'http://localhost',
  port: 8001,
  dependencies: [
    {
      order: 1,
      inHead: true,
      element: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    }
  ]
}

let envConfig
const selectedEnv = argv['env-config'] || 'dev'
const selectedBuildType = argv['build-type'] || 'dev'

// tslint:disable:no-require-imports
try {
  envConfig = JSON.stringify({ ...require(`../env/${selectedEnv}`), ...OVERRIDES })
} catch (err) {
  throw new Error(`Unable to find environment configuration for '${selectedEnv}' `)
}

const TypeHelper = require('fuse-box-typechecker').TypeHelper

export const taskName = (nodeFilename: string) => basename(nodeFilename).replace('.ts', '')
export const ENV_CONFIG_INSTANCE = { angularAppConfig: envConfig }
export const cdn = process.env.CDN_ORIGIN ? process.env.CDN_ORIGIN : undefined
export const cachebuster = Math.round(new Date().getTime() / 1000)
export const isBuildServer: boolean = argv.ci
export const isAot: boolean = argv.aot
export const isProdBuild =
  selectedBuildType === 'prod' ||
  selectedBuildType === 'production' ||
  process.env.NODE_ENV === 'prod' ||
  process.env.NODE_ENV === 'production'

export const typeHelper = (sync = true, throwOnTsLint = true) => {
  const _runner = TypeHelper({
    basePath: './src',
    tsConfig: './tsconfig.json',
    tsLint: './tslint.json',
    name: 'App typechecker',
    throwOnTsLint
  })
  if (sync) {
    _runner.runSync()
  } else {
    _runner.runAsync()
  }
}
