import { config as dotenv } from 'dotenv'
import { EnvConfig } from '../../tools/config/app.config'

export interface ServerEnvironmentConfig {
  FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID: string
  FB_SERVICE_ACCOUNT_PRIVATE_KEY: string
  FB_AUTH_KEY: string
}

dotenv()

// this comes from fusebox
export const ANGULAR_APP_CONFIG = JSON.parse(process.env.angularAppConfig) as EnvConfig

const errors: string[] = []

if (!process.env.FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID) errors.push('Missing FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID')
if (!process.env.FB_SERVICE_ACCOUNT_PRIVATE_KEY) errors.push('Missing FB_SERVICE_ACCOUNT_PRIVATE_KEY')
if (!process.env.FB_AUTH_KEY) errors.push('Missing FB_AUTH_KEY')

if (errors.length > 0) {
  console.error('Invalid Configuration')
  console.error(errors.join('\n'))
}

export const SERVER_CONFIG = process.env as ServerEnvironmentConfig

// tslint:disable-next-line:no-require-imports
const base = require('./data/service-account.json')

export const FB_SERVICE_ACCOUNT_CONFIG = {
  ...base,
  private_key_id: SERVER_CONFIG.FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: SERVER_CONFIG.FB_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  project_id: ANGULAR_APP_CONFIG.firebase.config.projectId
}
