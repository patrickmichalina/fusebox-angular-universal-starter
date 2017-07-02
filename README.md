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
- [x] Automatic sitemap generation
- [x] [SCSS](http://sass-lang.com) support for professional grade CSS management
- [x] [Brotli compression](https://github.com/google/brotli) with [gzip](http://www.gzip.org) fallback
- [x] [CircleCI](https://circleci.com) unit testing support 
- [x] Full favicon icon generation for multiple devices derived from a single seed image
- [ ] SEO support for Title and Meta tags
- [ ] OG (Open Graph) tags for social sharing
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

# start the server
$ npm start

# start the server in production mode
$ npm run start.prod

```

## Environment Variables

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
GA_TRACKING_ID : UA-78080189-2
GA_VERIFICATION_CODE : RW-hcjXEgPMoy2NF8pTl8IEzP8gnj3cEZ6aF1HDUiOc
```