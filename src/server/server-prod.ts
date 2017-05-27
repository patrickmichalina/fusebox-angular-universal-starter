// import './server.imports';
// import * as express from 'express';
// import * as compression from 'compression';
// import * as cookieParser from 'cookie-parser';
// import { express as useragent } from 'express-useragent';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// import { enableProdMode } from '@angular/core';
// import { AppServerModuleNgFactory } from './app.server.module.ngfactory';

// enableProdMode();

// const build = 'prod';
// const port = 8000;
// const app = express();
// app.use(cookieParser());
// app.use(compression());
// app.use(useragent());
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory
// }));
// app.set('view engine', 'html');
// app.set('views', `./dist/${build}`);
// app.use('/node_modules', express.static('./node_modules'));
// app.use('/css', express.static(`./dist/${build}/css`));
// app.use('/app', express.static(`./dist/${build}/app`));
// app.use('/assets', express.static(`./dist/${build}/assets`));
// app.use('/js', express.static(`./dist/${build}/js`));
// app.get('/*', (req, res) => {
//   return res.render('index', {
//     req: Object.assign(req, req.useragent),
//     res
//   });
// });
// app.listen(8000, () => {
//   console.log(`Angular Universal Server listening on port ${port} ...`);
// });
