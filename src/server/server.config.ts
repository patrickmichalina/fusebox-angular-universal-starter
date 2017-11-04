import { config as dotenv } from 'dotenv'
import { writeFileSync } from 'fs'
import { EnvConfig } from '../../tools/config/app.config'
declare var __process_env__: any

export function fuseBoxConfigFactory() {
  return JSON.parse(__process_env__.angularAppConfig) as EnvConfig
}

export interface ServerEnvironmentConfig {
  FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID: string
  FB_SERVICE_ACCOUNT_PRIVATE_KEY: string
}

// this comes from fusebox
export const ANGULAR_APP_CONFIG = fuseBoxConfigFactory()

const env = dotenv()
if (env.error && ANGULAR_APP_CONFIG.env === 'dev') {
  console.error('.env development file created!\nYOU MUST ADD YOUR CONFIGURATION VALUES TO IT')
  writeFileSync('.env',
`FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID=
FB_SERVICE_ACCOUNT_PRIVATE_KEY=`)
}

const errors: string[] = []

if (!process.env.FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID) errors.push('Missing FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID')
if (!process.env.FB_SERVICE_ACCOUNT_PRIVATE_KEY) errors.push('Missing FB_SERVICE_ACCOUNT_PRIVATE_KEY')

if (errors.length > 0) {
  console.error('Invalid Configuration')
  console.error(errors.join('\n'))
}

export const SERVER_CONFIG: ServerEnvironmentConfig = process.env as any

// tslint:disable-next-line:no-require-imports
const base = require('./service-account.json')

export const FB_SERVICE_ACCOUNT_CONFIG = {
  ...base,
  private_key_id: SERVER_CONFIG.FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: SERVER_CONFIG.FB_SERVICE_ACCOUNT_PRIVATE_KEY && SERVER_CONFIG.FB_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  project_id: ANGULAR_APP_CONFIG.firebase.config.projectId
}
