// import { ServerResponseService } from './server-response.service'
import { Inject, Injectable } from '@angular/core'
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { CACHE_TAG_CONFIG, CacheTagConfig } from './http-cache-tag.module'

@Injectable()
export class HttpCacheTagInterceptor implements HttpInterceptor {

  constructor( @Inject(CACHE_TAG_CONFIG) private config: CacheTagConfig) {
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
        // console.log(this.factory)
        this.config.factory(event, this.config)
        // const cacheHeader = event.headers.get(this.config.headerKey)
        // if (cacheHeader) {
        //   this.serverResponseService.appendHeader(this.config.headerKey, cacheHeader)
        // }
      }
      return event
    })
  }
}
