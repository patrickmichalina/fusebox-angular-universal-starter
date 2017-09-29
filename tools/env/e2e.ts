import { EnvConfig } from '../config/app.config';
import * as base from './base';

const DevConfig: EnvConfig = {
  ...base,
  env: 'e2e',
  endpoints: {
    api: 'http://localhost:8000/api',
    websocketServer: 'ws://localhost:80001'
  },
};

export = DevConfig;