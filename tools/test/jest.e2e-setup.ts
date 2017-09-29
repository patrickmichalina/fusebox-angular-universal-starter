import * as Nightmare from 'nightmare'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 125000

// tslint:disable:no-require-imports
const browser = require('nightmare')({
  show: false
}) as Nightmare

const baseUrl = 'http://localhost:8000'

export { browser, baseUrl }
