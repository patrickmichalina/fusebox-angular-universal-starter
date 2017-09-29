// tslint:disable:no-require-imports

import { useContainer, useExpressServer as configApi } from 'routing-controllers'
import { Container } from 'typedi'
import { controllers } from './controllers'
import { middlewares } from './middlewares'
import * as express from 'express'
import * as bodyParser from 'body-parser'
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

useContainer(Container)

export const useApi = (app: express.Application) => {
  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'fusebox-angular-universal-starter',
        description: '',
        termsOfService: '',
        contact: {
          name: 'Patrick Michalina',
          url: 'https://github.com/patrickmichalina/fusebox-angular-universal-starter/issues',
          email: 'patrickmichalina@mac.com'
        },
        license: {
          name: 'MIT',
          url: 'https://github.com/patrickmichalina/fusebox-angular-universal-starter/blob/master/LICENSE'
        },
        version: '1.0.0'
      }
    },
    apis: ['./src/server/api/controllers/**/*.ts']
  })

  app.use('/api/**', bodyParser.json())
  app.use('/api/**', bodyParser.urlencoded({ extended: false }))
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  configApi(app, {
    cors: true,
    validation: true,
    routePrefix: '/api',
    controllers,
    middlewares,
    defaultErrorHandler: false,
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    }
  })
}
