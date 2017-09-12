import { EnvConfig } from '../config/app.config';
import * as base from './base';

const ProdConfig: EnvConfig = { 
  ...base,
  env: 'prod',
  host: "https://angular.patrickmichalina.com",
  server: {
    host: "https://angular.patrickmichalina.com",
    minifyIndex: true,
    prodMode: true,
    port: 8083
  }
};

export = ProdConfig;