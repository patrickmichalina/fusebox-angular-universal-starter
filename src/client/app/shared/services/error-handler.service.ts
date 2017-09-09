import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { LocationStrategy, PathLocationStrategy } from '@angular/common'
import { ILoggingService, LoggingService } from './logging.service'
import { EnvironmentService, IEnvironmentService } from './environment.service'
import * as StackTrace from 'stacktrace-js'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: any) {
    const log = this.injector.get(LoggingService) as ILoggingService
    const env = this.injector.get(EnvironmentService) as IEnvironmentService
    const location = this.injector.get(LocationStrategy) as LocationStrategy
    const message = error.message ? error.message : error.toString()
    const url = location instanceof PathLocationStrategy ? location.path() : ''

    // lets grab the last 20 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stack = stackframes
        .splice(0, 20)
        .map(sf => sf.toString())
        .join('\n')

        log.error(message, { url, stack }, { config: env.config })
    }).catch(err => log.error(message, { url, stack: err }, { config: env.config }))
  }
}
