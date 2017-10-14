import { ServerResponseService } from './server-response.service'
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'

export const CACHE_TAG_CONFIG = new InjectionToken<CacheTagConfig>('app.config.http.cachetag')

export interface CacheTagConfig {
  headerKey: string
  cacheableResponseCodes: number[]

  // if empty, defaults to ALL urls
  cacheableUrls: RegExp
}

@Injectable()
export class HttpCacheTagInterceptor implements HttpInterceptor {

  constructor(private serverResponseService: ServerResponseService, @Inject(CACHE_TAG_CONFIG) private config: CacheTagConfig) {
    if (!config.headerKey) throw new Error('missing config.headerKey')
    if (!config.cacheableResponseCodes) throw new Error('missing config.cacheableResponseCodes')
  }

  isCacheableCode(code: number) {
    return this.config.cacheableResponseCodes.find(a => a === code)
  }

  isCacheableUrl(url: string | null) {
    if (!this.config.cacheableUrls || !url || url === null) return true
    return this.config.cacheableUrls.test(url)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).map(event => {
      if (event instanceof HttpResponse && this.isCacheableCode(event.status) && this.isCacheableUrl(event.url)) {
        const cacheHeader = event.headers.get(this.config.headerKey)
        if (cacheHeader) {
          this.serverResponseService.appendHeader(this.config.headerKey, cacheHeader)
        }
      }
      return event
    })
  }
}
