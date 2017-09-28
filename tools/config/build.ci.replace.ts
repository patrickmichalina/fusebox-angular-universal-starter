// use this to replace values in your env/configs using environment variables from your CI/deployment system
import { argv } from 'yargs'

export const OVERRIDES = argv['ci-vars']
  ? {
    endpoints: {
      api: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    }
  }
  : {}