import { EnvConfig } from '../config/app.config';
import * as base from './base';

const ProdConfig: EnvConfig = { 
  ...base,
  env: 'prod',
  server: {
    host: "https://angular.patrickmichalina.com",
    minifyIndex: true,
    prodMode: true,
    port: 8083
  }
};

export = ProdConfig;