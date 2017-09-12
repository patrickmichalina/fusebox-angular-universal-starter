import { EnvConfig } from '../config/app.config';
import * as base from './base';

const DevConfig: EnvConfig = {
  ...base,
  env: 'dev',
  server: {
    host: "http://localhost:8000",
    port: 8001,
    minifyIndex: false
  }
};

export = DevConfig;