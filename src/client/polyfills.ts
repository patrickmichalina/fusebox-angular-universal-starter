// Fusebox
if (process.env.NODE_ENV !== 'development') {
  require = {} as any
}

// Required for Angular
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'

// IE9, IE10 and IE11 require all of the following polyfills.
// import 'core-js/es6/symbol'
// import 'core-js/es6/object'
// import 'core-js/es6/function'
// import 'core-js/es6/parse-int'
// import 'core-js/es6/parse-float'
// import 'core-js/es6/number'
// import 'core-js/es6/math'
// import 'core-js/es6/string'
// import 'core-js/es6/date'
// import 'core-js/es6/array'
// import 'core-js/es6/regexp'
// import 'core-js/es6/map'
// import 'core-js/es6/weak-map'
// import 'core-js/es6/set'

// IE10 and IE11 requires the following to support `@angular/animation`.
// import 'web-animations-js'

// rxjs
import './operators'
