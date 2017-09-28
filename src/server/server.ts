// tslint:disable:no-require-imports
import 'reflect-metadata'
import 'zone.js/dist/zone-node'
import 'zone.js/dist/long-stack-trace-zone'
import * as express from 'express'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import ms = require('ms')
import { createLogger } from '@expo/bunyan'
import { ngExpressEngine } from '@nguniversal/express-engine'
import { AppServerModule } from './server.angular.module'
import { sitemap } from './server.sitemap'
import { exists, existsSync } from 'fs'
import { argv } from 'yargs'
import { useApi } from './api'
import { useIdentity } from './identity'
import { join, resolve } from 'path'

const shrinkRay = require('shrink-ray')
const minifyHTML = require('express-minify-html')
const bunyanMiddleware = require('bunyan-middleware')
const xhr2 = require('xhr2')

xhr2.prototype._restrictedHeaders.cookie = false

require('ts-node/register')

const app = express()
const root = './dist'
const port = process.env.PORT || argv['port'] || 8001
const host = process.env.HOST || argv['host'] || 'http://localhost'
const isProd = argv['build-type'] === 'prod' || argv['prod']
const isTest = argv['e2e']

const staticOptions = {
  index: false,
  maxAge: isProd ? ms('1yr') : ms('0'),
  setHeaders: (res: express.Response, path: any) => {
    res.setHeader('Expires', isProd
      ? new Date(Date.now() + ms('1yr')).toUTCString()
      : new Date(Date.now() + ms('0')).toUTCString())
  }
}
const logger = createLogger({
  name: 'Angular Universal App',
  type: 'http',
  streams: [{
    level: 'error',
    stream: { write: (err: any) => console.log },
    type: 'raw'
  }] as any
})
console.log('HEROKU_APP_NAME', process.env['HEROKU_APP_NAME'])
if (!isTest) app.use(bunyanMiddleware({ logger, excludeHeaders: ['authorization', 'cookie'] }))

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }))
app.set('view engine', 'html')
app.set('views', root)
app.use(cookieParser())
app.use(shrinkRay())

// You can remove the Identity and API servers by deleteing these two lines
useIdentity(app)
useApi(app)
app.set('ignore-routes', ['/api/', '/oidc', '/.well-known'])

if (isProd) {
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
  }))
}

if (existsSync(join(root, 'assets/favicons/favicon.ico'))) {
  app.use(favicon(join(root, 'assets/favicons/favicon.ico')))
}
app.use('/css', express.static('dist/css', staticOptions))
app.use('/js', express.static('dist/js', staticOptions))
app.use('/robots.txt', express.static('dist/web/robots.txt', staticOptions))
app.use('/assets', express.static('dist/assets', { ...staticOptions, fallthrough: false }))
app.use('/changelog.md', express.static('dist/web/changelog.md', { ...staticOptions, fallthrough: false }))
app.get('/sitemap.xml', (req: express.Request, res: express.Response) => {
  const fileLocation = resolve(root, 'sitemap.xml')
  const url = isProd ? host : `${host}:${port}`

  exists(fileLocation, doesExist => {
    doesExist
      ? res.sendFile(fileLocation)
      : sitemap(url)
        .then(a => res.header('Content-Type', 'text/xml').send(a))
        .catch(err => res.sendStatus(500))
  })
})

app.get('/*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if ((req.app.get('ignore-routes') as string[]).some(a => req.url.includes(a))) return next()
  return res.render('index', {
    req,
    res
  })
})

app.listen(port, () => {
  logger.info(`Angular Universal Server listening at ${host}:${port}`)
})
