import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';
import * as express from 'express';
import * as morgan from 'morgan';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import { join, resolve } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app.server.module';
import { forceSsl } from './server.heroku.ssl';
import { sitemap } from './server.sitemap';
import { exists, existsSync } from 'fs';
import { EnvConfig } from '../../tools/config/app.config';
import { argv } from 'yargs';
declare var __process_env__: EnvConfig;

const shrinkRay = require('shrink-ray')
const minifyHTML = require('express-minify-html');

require('ts-node/register');

const root = './dist';
const port = process.env.PORT || __process_env__.server.port;
const isProd = argv['build-type'] === 'prod' || process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? true : false;
const host = process.env.HOST || __process_env__.server.host;
const staticOptions = { index: false, maxAge: isProd ? '1yr' : '0' };
const app = express();

if (process.env.HEROKU) app.use(forceSsl);

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', root);
app.use(cookieParser());
app.use(shrinkRay());
if (__process_env__.server.minifyIndex) {
  app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      minifyJS: true
    }
  }));
}
app.use(morgan(isProd ? 'common' : 'dev'));
app.get('/sitemap.xml', (req, res) => {
  const fileLocation = resolve(__dirname, 'dist/sitemap.xml');

  exists(fileLocation, (exists) => {
    return exists
      ? res.sendFile(fileLocation)
      : sitemap(host).then(a => res.header('Content-Type', 'text/xml').send(a));
  });
});

if (existsSync(join(root, 'assets/favicons/favicon.ico'))) {
  app.use(favicon(join(root, 'assets/favicons/favicon.ico')));
}

app.use('/css', express.static('dist/css', staticOptions));
app.use('/js', express.static('dist/js', staticOptions));
app.get('/*', (req, res) => {
  return res.render('index', {
    req,
    res,
  });
});

app.listen(port, () => {
  console.log(`\nAngular Universal Server listening at ${host}:${port} \n`);
});
