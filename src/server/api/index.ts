import { useContainer, useExpressServer as configApi } from 'routing-controllers'
import { Container } from 'typedi'
import { controllers } from './controllers'
import { middlewares } from './middlewares'
import * as bodyParser from 'body-parser'
import * as express from 'express'

useContainer(Container)

export const useApi = (app: express.Application) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
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
