import { EnvConfig } from '../config/app.config';
import * as base from './base';

const ProdConfig: EnvConfig = { 
  ...base,
  env: 'prod',
  host: "https://angular.patrickmichalina.com"
};

export = ProdConfig;