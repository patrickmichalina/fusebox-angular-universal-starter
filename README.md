# Introduction

Provides an extremely fast starter for the development of Angular Universal (isomorphic) projects.

(This is early work and under heavy development, lots wil change!)

Includes the following features:
- [x] FuseBox bundling
- [x] Production and development builds
- [x] Fast Angular testing with Jest
- [x] Manage your type definitions using @types
- [x] Simple Heroku Deployment
- [x] HttpStateTransfer for caching server responses on client boostrap (no flickering)
- [x] [Brotli compression](https://github.com/google/brotli) with [gzip](http://www.gzip.org) fallback
- [ ] Hot Module Reloading (client only dev mode)
- [ ] Client-Only and Server build servers
- [ ] Support for Angular Mobile Toolkit (Service Worker)
- [ ] Ahead-of-Time (AOT) compilation support
- [ ] Tree-Shaking builds with Rollup


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