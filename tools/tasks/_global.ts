import { argv } from 'yargs';
import { EnvConfig } from '../config/app.config';

let envConfig;
let selectedEnv = argv['env-config'] || 'dev';
let selectedBuildType = argv['build-type'] || 'dev';

try {
  envConfig = require(`../env/${selectedEnv}`);
} catch (err) {
  throw new Error(`Unable to find environment configuration for '${selectedEnv}' `);
}

export const ENV_CONFIG_INSTANCE = envConfig as EnvConfig;
export const cachebuster = Math.round(new Date().getTime() / 1000);
export const isBuildServer = argv.ci
export const isProdBuild = 
  selectedBuildType === 'prod' || 
  selectedBuildType === 'production' ||
  process.env.NODE_ENV === 'prod' ||
  process.env.NODE_ENV === 'production';
