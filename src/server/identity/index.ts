// tslint:disable:no-require-imports
import * as express from 'express'

export const useIdentity = (app: express.Application) => {
  const provider = require('oidc-provider')
  const rewrite = require('express-urlrewrite')

  const prefix = '/oidc'
  const configuration = {
    // ... see available options /docs/configuration.md
  }
  const clients = [{
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: ['http://lvh.me:8080/cb']
  }]

  const oidc = new provider('http://localhost:8000', configuration)
  oidc.initialize({ clients }).then(() => {
    app.use(prefix, oidc.callback)
    app.use(rewrite('/.well-known/*', `${prefix}/.well-known/$1`))
  })
}
