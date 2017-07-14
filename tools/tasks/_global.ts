import { argv } from 'yargs';
import { EnvConfig } from '../config/app.config';

let envConfig;
let selectedEnv = process.env.NODE_ENV || argv['env-config'] || 'dev';

if (selectedEnv === 'production') selectedEnv = 'prod';

try {
  // tslint:disable-next-line:no-require-imports
  envConfig = require(`../env/${selectedEnv}`);
} catch (err) {
  throw new Error(`Unable to find environment configuration for '${selectedEnv}' `);
}

export const EnvConfigInstance = envConfig as EnvConfig;
export const cachebuster = Math.round(new Date().getTime() / 1000);
export const isProd = process.env.NODE_ENV === 'prod' ? true : false;
