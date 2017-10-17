import { EnvConfig } from '../config/app.config';

const BaseConfig: EnvConfig = {
  name: 'Fusebox Angular Universal Starter',
  description: 'Fusebox Angular Universal Starter',
  endpoints: {
    api: 'http://localhost:8000/api',
    websocketServer: 'ws://localhost:8001'
  },
  firebase: {
    appName: 'fuse-angular-universal-starter',
    config: {
      apiKey: 'AIzaSyDfE1owJZCbvasXieCKjMoGZddRhqcp7RM',
      authDomain: 'fuse-angular-universal-s-67402.firebaseapp.com',
      databaseURL: 'https://fuse-angular-universal-s-67402.firebaseio.com',
      projectId: 'fuse-angular-universal-s-67402',
      storageBucket: 'fuse-angular-universal-s-67402.appspot.com',
      messagingSenderId: '883416191164'
    }
  },
  host: 'http://localhost:8000'
};

export = BaseConfig;