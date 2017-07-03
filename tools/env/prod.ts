import { IConfig } from '../config/app.config';
import * as base from './base';

const ProdConfig: IConfig = Object.assign(base, {
  server: {
    host: "https://angular.patrickmichalina.com",
    port: 8083,
    minifyIndex: true
  }
});

export = ProdConfig;