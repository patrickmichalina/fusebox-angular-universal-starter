import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';
import 'systemjs';
import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { join, resolve } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app.server.module';

const root = resolve(process.argv[1], '../');
const pkg = join(process.env.PWD, './package.json');
const settings = require(pkg).app;
const app = express();

app.use(compression());
app.use(morgan('dev'));
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));
app.set('view engine', 'html');
app.set('views', join(root, '.'));
app.use('/js', express.static(join(root, './js')));
app.get('/*', (req, res) => {
  return res.render('index', {
    req,
    res,
  });
});
app.listen(settings.server.port, () => {
  console.log(`Angular Universal Server listening on port ${settings.server.port}...`);
});
