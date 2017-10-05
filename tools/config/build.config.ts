import { BuildConfiguration } from './build.interfaces';
import { Dependency } from '../plugins/web-index';
import { argv } from 'yargs';
import { EnvConfig } from '../config/app.config';
import { basename } from 'path';
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
    },
    {
      order: 2,
      inHead: false,
      element: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    },
    {
      order: 3,
      inHead: true,
      element: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: process.env.GA_VERIFICATION_CODE
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE
    },
    {
      order: 4,
      inHead: false,
      element: 'script',
      content: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', '${process.env.GA_TRACKING_ID}', 'auto');`,
      attributes: {
        type: 'text/javascript',
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE
    },
    {
      order: 5,
      inHead: false,
      element: 'script',
      attributes: {
        async: 'true',
        type: 'text/javascript',
        src: 'https://www.google-analytics.com/analytics.js'
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE,
    }
  ]
};

let envConfig;
let selectedEnv = argv['env-config'] || 'dev';
let selectedBuildType = argv['build-type'] || 'dev';

try {
  envConfig = require(`../env/${selectedEnv}`);
} catch (err) {
  throw new Error(`Unable to find environment configuration for '${selectedEnv}' `);
}

const TypeHelper = require('fuse-box-typechecker').TypeHelper

export const taskName = (nodeFilename: string) => basename(nodeFilename).replace('.ts', '');
export const ENV_CONFIG_INSTANCE = { ...envConfig, ...OVERRIDES } as EnvConfig;
export const cdn = process.env.CDN_ORIGIN ? process.env.CDN_ORIGIN : undefined;
export const cachebuster = Math.round(new Date().getTime() / 1000);
export const isBuildServer: boolean = argv.ci
export const isAot: boolean = argv.aot
export const isProdBuild =
  selectedBuildType === 'prod' ||
  selectedBuildType === 'production' ||
  process.env.NODE_ENV === 'prod' ||
  process.env.NODE_ENV === 'production';

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
