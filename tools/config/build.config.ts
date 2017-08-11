import { BuildConfiguration, Dependency, DependencyType, SourceType } from './build.interfaces';
import { argv } from 'yargs';
import { EnvConfig } from '../config/app.config';
import { basename } from 'path';

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
  dependencies: [
    {
      type: DependencyType.Stylesheet,
      order: 1,
      preloaded: true,
      source: {
        type: SourceType.ExternalLink,
        link: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    },
    {
      type: DependencyType.Meta,
      order: 2,
      preloaded: true,
      attributes: {
        name: 'google-site-verification',
        content: process.env.GA_VERIFICATION_CODE
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE
    },
    {
      type: DependencyType.Script,
      order: 3,
      preloaded: false,
      source: {
        type: SourceType.Inline,
        // tslint:disable-next-line:max-line-length
        link: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', '${process.env.GA_TRACKING_ID}', 'auto');`
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE
    },
    {
      type: DependencyType.Script,
      order: 4,
      preloaded: false,
      source: {
        type: SourceType.ExternalLink,
        link: 'https://www.google-analytics.com/analytics.js'
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE,
      attributes: {
        async: true
      }
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

export const taskName = (nodeFilename: string) => basename(nodeFilename).replace('.ts', '');
export const ENV_CONFIG_INSTANCE = envConfig as EnvConfig;
export const cdn = process.env.CDN_ORIGIN ? process.env.CDN_ORIGIN : undefined;
export const cachebuster = Math.round(new Date().getTime() / 1000);
export const isBuildServer = argv.ci
export const isProdBuild = 
  selectedBuildType === 'prod' || 
  selectedBuildType === 'production' ||
  process.env.NODE_ENV === 'prod' ||
  process.env.NODE_ENV === 'production';
