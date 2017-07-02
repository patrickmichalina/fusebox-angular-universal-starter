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
import { sitemap } from './server.sitemap';
import { stat } from 'fs';
const shrinkRay = require('shrink-ray')
const minifyHTML = require('express-minify-html');

require('ts-node/register');

const root = resolve(process.argv[1], '../');
const pkg = join(process.env.PWD, './tools/config.ts');
const settings = require(pkg).config;
const port = process.env.PORT || settings.server.port;
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? true : false;
const host = process.env.HOST || `http://localhost:${port}`;
const staticOptions = { index: false, maxAge: isProd ? '1yr' : '0' };
const app = express();

if (process.env.HEROKU) app.use(forceSsl);

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', root);
app.use(shrinkRay());
if (settings.minifyIndex) {
  app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));
}
app.use(morgan(isProd ? 'common' : 'dev'));
app.get('/sitemap.xml', (req, res) => {
  const fileLocation = join(root, 'sitemap.xml');

  stat(fileLocation, (err) => {
    return err
      ? sitemap(host).then(a => res.header('Content-Type', 'text/xml').send(a))
      : res.sendFile(fileLocation);
  });
});
app.use(favicon(join(root, 'assets/favicons/favicon.ico')));
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
