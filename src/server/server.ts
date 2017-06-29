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

const root = resolve(process.argv[1], '../');
const pkg = join(process.env.PWD, './package.json');
const settings = require(pkg).app;
const port = process.env.PORT || settings.server.port;
const app = express();

app.use(compression());
app.use(favicon(join(root, 'assets/favicon.ico')));
app.use(morgan(process.env.NODE_ENV === 'prod' ? 'compressed' : 'dev'));
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
