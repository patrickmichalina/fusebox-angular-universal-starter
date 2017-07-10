import { Config } from 'protractor';

export const config: Config = {
  baseUrl: 'http://localhost:8083/',
  specs: [
    '../../.e2e/**.js'
  ],
  exclude: [],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
  },
  directConnect: true,
  capabilities: {
    browserName: 'chrome'
  },
  useAllAngular2AppRoots: true
};
