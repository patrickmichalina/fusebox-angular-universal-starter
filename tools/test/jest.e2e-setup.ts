import * as Nightmare from 'nightmare'

// tslint:disable:no-require-imports
const browser = require('nightmare')({
  show: true
}) as Nightmare

const baseUrl = 'http://localhost:8001'

export { browser, baseUrl }
