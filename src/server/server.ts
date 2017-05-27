import './server.imports';
import * as express from 'express';
// import * as compression from 'compression';
// import * as cookieParser from 'cookie-parser';
// import * as morgan from 'morgan';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app.server.module';

// const build = 'dev';
const port = 8000;
const app = express();
// app.use(cookieParser());
// app.use(compression());
// app.use(morgan(build));
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));
app.set('view engine', 'html');
app.set('views', `./dist`);
app.use('/node_modules', express.static('./node_modules'));
app.use('/js', express.static(`./dist/js`));
// app.use('/css', express.static(`./dist/${build}/css`));
// app.use('/app', express.static(`./dist/${build}/app`));
// app.use('/assets', express.static(`./dist/${build}/assets`));
app.get('/*', (req, res) => {
  return res.render('index', {
    req,
    res,
  });
});
app.listen(8000, () => {
  console.log(`Angular Universal Server listening on port ${port}...`);
});
