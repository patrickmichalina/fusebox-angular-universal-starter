// tslint:disable:no-require-imports
// tslint:disable-next-line:import-blacklist
import 'rxjs'
import * as supertest from 'supertest'
import { useApi } from './index'
const express = require('express')
const app = express()
useApi(app)

export const testApi = supertest.agent(app)
