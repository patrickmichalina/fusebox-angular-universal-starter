// tslint:disable:no-require-imports
import * as express from 'express'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

export const useIdentity = (app: express.Application) => {
  const provider = require('oidc-provider')
  const { createKeyStore } = require('oidc-provider')
  const rewrite = require('express-urlrewrite')

  const prefix = '/oidc'
  const configuration = {
    features: {
      claimsParameter: true,
      discovery: true,
      encryption: true,
      introspection: true,
      registration: true,
      request: true,
      revocation: true,
      sessionManagement: true
    }
    // ... see available options /docs/configuration.md
  }

  const clients = [{
    client_id: 'angular',
    client_secret: 'secret_code',
    token_endpoint_auth_method: 'client_secret_post',
    redirect_uris: ['http://localhost:8000']
  }]

  const oidc = new provider('http://localhost:8000', configuration)
  const keystore = createKeyStore()

  Promise.all([
    keystore.generate('RSA', 2048),
    keystore.generate('EC', 'P-256'),
    keystore.generate('EC', 'P-384'),
    keystore.generate('EC', 'P-521')
  ]).then(() => {
    writeFileSync(resolve('dist/keystore.json'), JSON.stringify(keystore.toJSON(true), undefined, 2))
    oidc.initialize({ clients, keystore }).then(() => {
      // oidc.app.proxy = true
      app.use(prefix, oidc.callback)
      app.use(rewrite('/.well-known/*', `${prefix}/.well-known/$1`))
    })
  })
}
