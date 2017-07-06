# Introduction

[![CircleCI](https://circleci.com/gh/patrickmichalina/fusebox-angular-universal-starter.svg?style=shield)](https://circleci.com/gh/patrickmichalina/fusebox-angular-universal-starter)
[![codecov](https://codecov.io/gh/patrickmichalina/fusebox-angular-universal-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/patrickmichalina/fusebox-angular-universal-starter)
[![dependencies Status](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter/status.svg)](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter)
[![devDependencies Status](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter/dev-status.svg)](https://david-dm.org/patrickmichalina/fusebox-angular-universal-starter?type=dev)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

Provides an extremely fast seed project for the development of Angular Universal (isomorphic) projects.

This is early work and under heavy development. A demo project can be found [here](https://angular.patrickmichalina.com)

Includes the following features:
- [x] [Angular 4](https://github.com/angular/angular/blob/master/CHANGELOG.md)
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
- [ ] Hot Module Reloading for faster browser reloads during development
- [ ] Both Client and Server build tasks
- [ ] Support for [Angular Mobile Toolkit](https://mobile.angular.io) (Service Worker)
- [ ] [Ahead-of-Time](https://angular.io/guide/aot-compiler) (AOT) compilation support
- [ ] [Lazy Loaded](https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html) modules
- [ ] [Tree-Shaking](https://angular.io/guide/aot-compiler) for production builds

# How to Start

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

# start the server
$ npm start

# start the server in production mode
$ npm run start.prod

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

# Change Log

You can follow the [Angular change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

[MIT](https://github.com/patrickmichalina/fusebox-angular-universal-starter/blob/master/LICENSE)