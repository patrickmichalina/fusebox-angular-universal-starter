import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import * as express from 'express'

@Middleware({ type: 'after' })
export class ZoneErrorHandler implements ExpressErrorMiddlewareInterface {
  // Simply supresses zonejs error
  error(error: any, request: express.Request, response: express.Response) {
    const err = {
      httpCode: error.httpCode,
      name: error.name,
      message: error.message,
      errors: error.errors
    }
    response.status(error.httpCode).send(err)
  }
}
