import { EnvConfig } from '../config/app.config';
import * as base from './base';

const DevConfig: EnvConfig = {
  ...base,
  env: 'dev'
};

export = DevConfig;