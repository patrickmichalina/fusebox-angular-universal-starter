import './server.imports';
import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app.server.module';

const app = express();
app.use(compression());
app.use(morgan('dev'));
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));
app.set('view engine', 'html');
app.set('views', `./dist`);
app.use(express.static('./dist'))
app.get('/*', (req, res) => {
  return res.render('index', {
    req,
    res,
  });
});
app.listen(8080, () => {
  console.log(`Angular Universal Server listening on port 8080...`);
});
