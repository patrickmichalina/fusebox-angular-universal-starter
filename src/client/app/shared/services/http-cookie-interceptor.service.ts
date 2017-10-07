import { REQUEST } from '@nguniversal/express-engine/tokens'
import { PlatformService } from './platform.service'
import { Observable } from 'rxjs/Observable'
import { Injectable, InjectionToken, Injector } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import * as express from 'express'

// tslint:disable-next-line:no-require-imports
const URL = require('url-parse')

export const COOKIE_HOST_WHITELIST = new InjectionToken<string[]>('app.cookie.whitelist')

@Injectable()
export class HttpCookieInterceptor implements HttpInterceptor {

  constructor(private ps: PlatformService, private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const whitelistedDomains = this.injector.get(COOKIE_HOST_WHITELIST) as string[]
    const url = new URL(req.url)

    if (whitelistedDomains && !whitelistedDomains.some(a => a === url.hostname)) return next.handle(req)

    if (this.ps.isServer) {
      const serverRequest = this.injector.get(REQUEST) as express.Request

      const cookieString = Object.keys(serverRequest.cookies || {}).reduce((accumulator, cookieName) => {
        accumulator += `${cookieName}=${serverRequest.cookies[cookieName]};`
        return accumulator
      }, '')

      return next.handle(req.clone({
        withCredentials: true,
        headers: req.headers.set('Cookie', cookieString)
      }))
    }
    return next.handle(req.clone({
      withCredentials: true
    }))
  }
}
