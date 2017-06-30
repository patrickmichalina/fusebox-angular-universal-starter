# Introduction

Provides an extremely fast starter for the development of Angular Universal (isomorphic) projects.

This is early work and under heavy development.

Includes the following features:
- [x] [FuseBox](http://fuse-box.org) bundling
- [x] Fully typed build tools using [TypeScript](https://www.typescriptlang.org) and [Sparky](http://fuse-box.org/page/sparky)
- [x] Production and development builds
- [x] Fast Angular testing with [Jest](https://facebook.github.io/jest)
- [x] Manage your type definitions using [@types](https://www.npmjs.com/~types)
- [x] Simple [Heroku](https://www.heroku.com) Deployment
- [x] HttpStateTransfer for caching server responses on client boostrap (no flickering)
- [x] CDN asset configuration
- [x] [Brotli compression](https://github.com/google/brotli) with [gzip](http://www.gzip.org) fallback
- [ ] SEO support for Title and Meta tags
- [ ] Hot Module Reloading
- [ ] Both Client and Server build tasks
- [ ] Support for [Angular Mobile Toolkit](https://mobile.angular.io) (Service Worker)
- [ ] [Ahead-of-Time](https://angular.io/guide/aot-compiler) (AOT) compilation support
- [ ] [Lazy Loaded](https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html) modules
- [ ] [Tree-Shaking](https://angular.io/guide/aot-compiler) for production builds

## How to Start

**Note that we strongly recommend node >= v7.0.0 and npm >= 4.0.0.**

To start the seed use:


```bash
$ git clone --depth 1 https://github.com/patrickmichalina/fusebox-angular-universal-starter
$ cd fusebox-angular-universal-starter

# install the project's dependencies
$ npm install

# single test run
$ npm test 

# continuous testing
$ npm run test.watch

# start the local server
$ npm start

```