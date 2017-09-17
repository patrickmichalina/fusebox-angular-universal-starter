import { EnvConfig } from '../config/app.config';
import * as base from './base';

const DevConfig: EnvConfig = {
  ...base,
  env: 'e2e',
  endpoints: {
    api: 'http://localhost:3000'
  },
};

export = DevConfig;