import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';
import 'systemjs';
import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as favicon from 'serve-favicon';
import { join, resolve } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app.server.module';

import { forceSsl } from './heroku.force-ssl';

require('ts-node/register');

const root = resolve(process.argv[1], '../');
const pkg = join(process.env.PWD, './tools/config.ts');
const settings = require(pkg).config.server;
const port = process.env.PORT || settings.port;
const app = express();

if (process.env.HEROKU) app.use(forceSsl);

app.use(compression());
app.use(favicon(join(root, 'assets/favicon.ico')));
app.use(morgan(process.env.NODE_ENV === 'prod' ? 'common' : 'dev'));
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));
app.set('view engine', 'html');
app.set('views', root);
app.use(express.static(root, { index: false, maxAge: '1yr' }))
app.get('/*', (req, res) => {
  return res.render('index', {
    req,
    res,
  });
});
app.listen(port, () => {
  console.log(`Angular Universal Server listening on port ${port}...`);
});
