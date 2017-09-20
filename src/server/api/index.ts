import { useContainer, useExpressServer as configApi } from 'routing-controllers'
import { Container } from 'typedi'
import { controllers } from './controllers'
import { middlewares } from './middlewares'
import * as bodyParser from 'body-parser'
import * as express from 'express'

useContainer(Container)

export const useApi = (app: express.Application) => {
  app.use(bodyParser.json())
  configApi(app, {
    routePrefix: '/api',
    controllers,
    middlewares,
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    }
  })
}
