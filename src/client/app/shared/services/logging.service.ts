import { Inject, Injectable, InjectionToken } from '@angular/core'
import { createLogger, LoggerOptions } from '@expo/bunyan'

export interface ILoggingService {
  trace(msg: string, obj?: { [key: string]: any }): void
  debug(msg: string, obj?: { [key: string]: any }): void
  info(msg: string, obj?: { [key: string]: any }): void
  warn(msg: string, obj?: { [key: string]: any }): void
  error(msg: string, obj?: { [key: string]: any }): void
}

export const LOGGER_CONFIG = new InjectionToken<LoggerOptions>('app.logger.config')

@Injectable()
export class LoggingService implements ILoggingService {
  private logger = createLogger(this.loggerConfig)

  constructor(@Inject(LOGGER_CONFIG) private loggerConfig: LoggerOptions) { }

  trace(msg: string, obj: { [key: string]: any } = {}): void {
    this.logger.trace({ trace: { msg, ...obj } }, msg)
  }

  debug(msg: string, obj: { [key: string]: any } = {}): void {
    this.logger.debug({ debug: { msg, ...obj } }, msg)
  }

  info(msg: string, obj: { [key: string]: any } = {}): void {
    this.logger.info({ info: { msg, ...obj } }, msg)
  }

  warn(msg: string, obj: { [key: string]: any } = {}): void {
    this.logger.warn({ warn: { msg, ...obj } }, msg)
  }

  error(msg: string, obj: { [key: string]: any } = {}): void {
    this.logger.error({ err: { msg, ...obj } }, msg)
  }
}
