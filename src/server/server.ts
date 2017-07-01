import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';
import 'systemjs';
import * as express from 'express';
import * as morgan from 'morgan';
import * as favicon from 'serve-favicon';
import { join, resolve } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app.server.module';
import { forceSsl } from './server.heroku.ssl';
import { brotli } from './server.brotli';
import { sitemap } from './server.sitemap';
import { stat } from 'fs';

require('ts-node/register');

const root = resolve(process.argv[1], '../');
const pkg = join(process.env.PWD, './tools/config.ts');
const settings = require(pkg).config.server;
const port = process.env.PORT || settings.port;
const app = express();
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? true : false;
const host = isProd ? process.env.HOST : `http://localhost:${port}`;
const staticOptions = { index: false, maxAge: isProd ? '1yr' : '0' };

if (process.env.HEROKU) app.use(forceSsl);

app.use(brotli);
app.use(favicon(join(root, 'assets/favicon.ico')));
app.use(morgan(isProd ? 'common' : 'dev'));
app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', root);
app.get('/sitemap.xml', (req, res) => {
  const fileLocation = join(root, 'sitemap.xml');

  stat(fileLocation, (err) => {
    if (err) {
      return sitemap(host)
        .then(a => res.header('Content-Type', 'text/xml').send(a));
    } else {
      return res.sendFile(fileLocation);
    }
  });
});
app.use(express.static(root, staticOptions));
app.get('/*', (req, res) => {
  return res.render('index', {
    req,
    res,
  });
});

app.listen(port, () => {
  console.log(`Angular Universal Server listening on port ${port}...`);
  sitemap(host).then(() => { });
});
