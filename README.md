# Introduction

[![CircleCI](https://circleci.com/gh/patrickmichalina/fusebox-angular-universal-starter.svg?style=shield)](https://circleci.com/gh/patrickmichalina/fusebox-angular-universal-starter)
[![codecov](https://codecov.io/gh/patrickmichalina/fusebox-angular-universal-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/patrickmichalina/fusebox-angular-universal-starter)
[![dependencies Status](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter/status.svg)](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter)
[![devDependencies Status](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter/dev-status.svg)](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter?type=dev)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

Provides an extremely fast seed project for the development of Angular Universal (isomorphic) projects.

This is early work and under heavy development. A demo project can be found [here](https://angular.patrickmichalina.com)

Includes the following features:
- [x] [Angular 5](https://github.com/angular/angular/blob/master/CHANGELOG.md)
- [x] [FuseBox](http://fuse-box.org) bundling
- [x] Fully typed build tools using [TypeScript](https://www.typescriptlang.org) and [Sparky](http://fuse-box.org/page/sparky)
- [x] Production and development builds
- [x] Fast Angular testing with [Jest](https://facebook.github.io/jest)
- [x] Manage your type definitions using [@types](https://www.npmjs.com/~types)
- [x] Simple [Heroku](https://www.heroku.com) Deployment
- [x] HttpStateTransfer for caching server responses on client boostrap (no flickering)
- [x] CDN asset configuration
- [x] Automatic sitemap generation
- [x] [SCSS](http://sass-lang.com) support for professional grade CSS management
- [x] [Brotli compression](https://github.com/google/brotli) with [gzip](http://www.gzip.org) fallback
- [x] [CircleCI](https://circleci.com) unit testing support 
- [x] Full favicon icon generation for multiple devices derived from a single seed image
- [x] SEO support for Title and Meta tags
- [x] OG (Open Graph) tags for social sharing
- [x] Simple Ad-Blocker detection service
- [x] Vendor-agnostic analytics using [angulartics2](https://github.com/angulartics/angulartics2)
- [x] Generic token based Authentication service with [JWT](https://jwt.io) cookie support.
- [x] Both Client and Server build tasks
- [x] Hot Module Reloading for faster browser reloads during client development
- [x] [Ahead-of-Time](https://angular.io/guide/aot-compiler) (AOT) compilation support
- [x] End-to-end (e2e) testing with Protractor
- [x] [angular-tslint-rules](https://github.com/fulls1z3/angular-tslint-rules) as configuration preset for [TSLint](https://github.com/palantir/tslint) and [codelyzer](https://github.com/mgechev/codelyzer).
- [x] Automatic static file cache invalidation
- [x] [Lazy Loaded](https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html) modules
- [x] Analyze bundle sizes by using [source-map-explorer](https://github.com/danvk/source-map-explorer)
- [ ] Support for [Angular Mobile Toolkit](https://mobile.angular.io) (Service Worker)
- [ ] [Tree-Shaking](https://angular.io/guide/aot-compiler) for production builds

# Quick Start

**Note that we strongly recommend node >= v7.0.0 and npm >= 4.0.0.**

To start the seed use:


```bash
$ git clone --depth 1 https://github.com/patrickmichalina/fusebox-angular-universal-starter
$ cd fusebox-angular-universal-starter

# install the project's dependencies
$ npm install

# single test run
$ npm test 

# single test with coverage results
$ npm run test.coverage

# continuous testing
$ npm run test.watch

# e2e testing
# start in different tabs
$ npm start
$ npm run webdriver.start
$ npm run test.e2e.start

# start the Angular Universal server
$ npm start

# start the Angular Universal server w/ AOT build step
$ npm run start.aot
# can also be called passing the parameter --aot
# npm start --aot

# start the application in Client only mode (not server driven), with HMR enabled
$ npm run start.spa

# start the server in production mode
$ npm run start.prod

```

# Table of Contents
* [Testing](#testing)
* [Configuration](#configuration)
* [Environment Variables](#environment-variables)
* [@Types](#types)
* [File Structure](#file-structure)
* [Change Log](#change-log)
* [License](#license)

# Bundling
Checkout how blazing fast bundling can be using FuseBox!

![fuse-box](https://thumbs.gfycat.com/WarmheartedUnfinishedHind-small.gif)

# Testing
Checkout how blazing fast testing can be using Jest!

![jest](https://thumbs.gfycat.com/CooperativeMammothEland-small.gif)

# Configuration
```shell
Coming Soon
```

# @Types
When you include a module that doesn't include typings, you can include external type definitions using the npm @types repo.

i.e, to have youtube api support, run this command in terminal: 
```shell
npm i -D @types/youtube @types/gapi @types/gapi.youtube
``` 

# Environment Variables

```bash
# it is important to set the following environmental variables on your CI server (examples below)
HOST : angular.patrickmichalina.com # the root origin of the application server
CI : true 

# for Heroku
HEROKU : true # to build on heroku, ssl settings are setup using this flag
NPM_CONFIG_PRODUCTION : false # to download all depenedencies on Heroku, including devDependencies

# cdn origin for assets will only be injected if the following environment variable is set
CDN_ORIGIN : https://my-distro.some-awesome-cdn.net

# google analytics settings will only be injected if the following environment variables are set
GA_TRACKING_ID : UA-18280491-Z
GA_VERIFICATION_CODE : RW-some-crazy-number
```

## File Structure
We use the component approach in our starter. This is the standard for developing Angular apps and a great way to ensure maintainable code
```
fusebox-angular-universal-starter/
 ├──.fusebox/                       * working folder for the js bundler
 ├──.vscode/                        * Visual Studio Code settings 
 ├──coverage/                       * stores recent reporting of test coverage
 ├──dist/                           * output files that represent the bundled application and its dependencies
 ├──node_modules/                   * project depdendencies
 |
 ├──src/
 |   ├──client/                     * client Angular code. (most your work should be done here)
 |   └──server/                     * server code
 |
 ├──tools/
 |   ├──config/
 |   |   ├──app.config.ts          * configuration interface for the web applications
 |   |   ├──build.config.ts        * configuration values for the build system
 |   |   ├──build.interfaces.ts    * configuration interfaces for the build system
 |   |   └──build.transformer.ts   * build system config transform helper
 |   |
 |   ├──env/
 |   |   ├──base.ts                * base app configuration 
 |   |   ├──dev.ts                 * dev app configuration
 |   |   ├──**.ts                  * arbitrary configuration called via the flag --env-config
 |   |   └──prod.ts                * production app configuration
 |   |
 |   ├──scripts/                   * misc. build helper scripts
 |   ├──tasks/                     * Sparky tasks
 |   ├──test/                      * testing system related configuration
 |   └──web/                       * static assets used for common web functions
 |
 ├──.gitignore                     * GIT settings
 ├──circl.yml                      * CirclCI configuration file
 ├──CODE_OF_CONDUCT.md             * standard code of conduct information
 ├──codecov.yml                    * codecov.io configuration file
 ├──CONTRIBUTING.md                * standard contributor information
 ├──fuse.ts                        * FuseBox entry point
 ├──LICENSE                        * software license
 ├──package-lock.json              * what npm uses to manage it's dependencies
 ├──package.json                   * what npm uses to manage it's dependencies
 ├──Procfile                       * Heroku deployment setting
 ├──README.md                      * project information
 ├──test-report.xml                * JUNIT test results
 ├──tsconfig-aot.json              * typescript config for AOT build using @angular-cli (ngc)
 └──tsconfig.json                  * typescript config
```

# Change Log

You can follow the [Angular change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

[MIT](https://github.com/patrickmichalina/fusebox-angular-universal-starter/blob/master/LICENSE)