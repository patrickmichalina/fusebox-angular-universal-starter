import { EnvConfig } from '../config/app.config';
import * as base from './base';

const ProdConfig: EnvConfig = Object.assign(base, {
  server: {
    host: "https://angular.patrickmichalina.com",
    port: 8083,
    minifyIndex: true
  }
});

export = ProdConfig;