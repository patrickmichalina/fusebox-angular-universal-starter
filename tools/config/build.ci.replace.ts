import { argv } from 'yargs'

// use this to replace values in your env/configs using environment variables from your CI/deployment system
export const OVERRIDES = argv['ci-vars'] ?
  {
    host: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
    endpoints: {
      api: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/api`,
      websocketServer: `wss://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    }
  } : {}