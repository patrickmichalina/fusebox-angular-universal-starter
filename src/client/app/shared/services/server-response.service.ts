import { RESPONSE } from '@nguniversal/express-engine/tokens'
import { Inject, Injectable, Optional } from '@angular/core'
import { Response } from 'express'
// tslint:disable-next-line:no-require-imports
import ms = require('ms')

export interface IServerResponseService {
  getHeader(key: string): string
  setHeader(key: string, value: string): this
  setHeaders(dictionary: { [key: string]: string }): this
  appendHeader(key: string, value: string, delimiter?: string): this
  setStatus(code: number, message?: string): this
  setNotFound(message?: string): this
  setError(message?: string): this
}

@Injectable()
export class ServerResponseService implements IServerResponseService {
  private response: Response

  constructor( @Optional() @Inject(RESPONSE) response: any) {
    this.response = response
  }

  getHeader(key: string): string {
    return this.response.getHeader(key) as string
  }

  setHeader(key: string, value: string): this {
    if (this.response)
      this.response.header(key, value)
    return this
  }

  appendHeader(key: string, value: string, delimiter = ','): this {
    if (this.response) {
      const current = this.getHeader(key)
      if (!current) return this.setHeader(key, value)

      const newValue = [...current.split(delimiter), value]
        .filter((el, i, a) => i === a.indexOf(el))
        .join(delimiter)

      this.response.header(key, newValue)
    }
    return this
  }

  setHeaders(dictionary: { [key: string]: string }): this {
    if (this.response)
      Object.keys(dictionary).forEach(key => this.setHeader(key, dictionary[key]))
    return this
  }

  setStatus(code: number, message?: string): this {
    if (this.response) {
      this.response.statusCode = code
      if (message)
        this.response.statusMessage = message
    }
    return this
  }

  setNotFound(message = 'not found'): this {
    if (this.response) {
      this.response.statusCode = 404
      this.response.statusMessage = message
    }
    return this
  }

  setUnauthorized(message = 'Unauthorized'): this {
    if (this.response) {
      this.response.statusCode = 401
      this.response.statusMessage = message
    }
    return this
  }

  setCachePrivate(): this {
    if (this.response) {
      this.setCache('private')
    }
    return this
  }

  setCacheNone(): this {
    if (this.response) {
      this.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      this.setHeader('Pragma', 'no-cache')
    }
    return this
  }

  setCache(directive: HttpCacheDirective, maxAge?: string, smaxAge?: string): this {
    if (this.response) {
      // tslint:disable-next-line:max-line-length
      if (smaxAge) {
        this.setHeader('Cache-Control', `${directive}, max-age=${maxAge ? ms(maxAge) / 1000 : 0}, s-maxage=${ms(smaxAge) / 1000}`)
      } else {
        this.setHeader('Cache-Control', `${directive}, max-age=${maxAge ? ms(maxAge) / 1000 : 0}`)
      }

      this.setHeader('Expires', maxAge ? new Date(Date.now() + ms(maxAge)).toUTCString() : new Date(Date.now()).toUTCString())
    }
    return this
  }

  setError(message = 'internal server error'): this {
    if (this.response) {
      this.response.statusCode = 500
      this.response.statusMessage = message
    }
    return this
  }
}

export type HttpCacheDirective = 'public' | 'private' | 'no-store' | 'no-cache' | 'must-revalidate' | 'no-transform' | 'proxy-revalidate'
