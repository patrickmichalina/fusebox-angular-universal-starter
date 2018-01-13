import { Inject, Injectable, InjectionToken } from '@angular/core'
import { createLogger, LoggerOptions } from '@expo/bunyan'

export interface ILoggingService {
  trace(msg: string, errObj?: { readonly [key: string]: any }, extendedObj?: { readonly [key: string]: any }): void
  debug(msg: string, errObj?: { readonly [key: string]: any }, extendedObj?: { readonly [key: string]: any }): void
  info(msg: string, errObj?: { readonly [key: string]: any }, extendedObj?: { readonly [key: string]: any }): void
  warn(msg: string, errObj?: { readonly [key: string]: any }, extendedObj?: { readonly [key: string]: any }): void
  error(msg: string, errObj?: { readonly [key: string]: any }, extendedObj?: { readonly [key: string]: any }): void
}

export const LOGGER_CONFIG = new InjectionToken<LoggerOptions>('app.logger.config')

@Injectable()
export class LoggingService implements ILoggingService {
  private readonly logger = createLogger(this.loggerConfig)

  constructor(@Inject(LOGGER_CONFIG) private loggerConfig: LoggerOptions) { }

  trace(msg: string, obj: { readonly [key: string]: any } = {}, extendedObj: { readonly [key: string]: any } = {}): void {
    this.logger.trace({ trace: { msg, ...obj }, ...extendedObj }, msg)
  }

  debug(msg: string, obj: { readonly [key: string]: any } = {}, extendedObj: { readonly [key: string]: any } = {}): void {
    this.logger.debug({ debug: { msg, ...obj }, ...extendedObj }, msg)
  }

  info(msg: string, obj: { readonly [key: string]: any } = {}, extendedObj: { readonly [key: string]: any } = {}): void {
    this.logger.info({ info: { msg, ...obj }, ...extendedObj }, msg)
  }

  warn(msg: string, obj: { readonly [key: string]: any } = {}, extendedObj: { readonly [key: string]: any } = {}): void {
    this.logger.warn({ warn: { msg, ...obj }, ...extendedObj }, msg)
  }

  error(msg: string, obj: { readonly [key: string]: any } = {}, extendedObj: { readonly [key: string]: any } = {}): void {
    this.logger.error({ err: { msg, ...obj }, ...extendedObj }, msg)
  }
}
