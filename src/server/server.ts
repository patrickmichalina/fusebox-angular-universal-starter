import { app } from './server.app'
import { EnvConfig } from '../../tools/config/app.config'
declare var __process_env__: EnvConfig
__process_env__.server.port = process.env.PORT || __process_env__.server.port
__process_env__.server.host = process.env.HOST || __process_env__.server.host

app(__process_env__).listen(__process_env__.server.port, () => {
  console.log(`\nAngular Universal Server listening at ${__process_env__.server.host}:${__process_env__.server.port} \n`)
});
