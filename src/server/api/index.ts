import { useContainer, useExpressServer as configApi } from 'routing-controllers'
import { Container } from 'typedi'
import { controllers } from './controllers'
import { middlewares } from './middlewares'
import * as express from 'express'

useContainer(Container)

export const useApi = (app: express.Application) => {
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
