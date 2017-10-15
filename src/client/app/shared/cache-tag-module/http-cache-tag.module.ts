import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http'
import { HttpCacheTagInterceptor } from './http-cache-tag-interceptor.service'

export const CACHE_TAG_CONFIG = new InjectionToken<CacheTagConfig>('app.config.http.cachetag')

export interface CacheTagConfig {
  headerKey: string
  cacheableResponseCodes: number[]
  cacheableUrls?: RegExp,
  factory(httpResponse: HttpResponse<any>, config: CacheTagConfig): void
}

@NgModule()
export class HttpCacheTageModule {
  static forRoot(configuredProvider: any = {
    provide: CACHE_TAG_CONFIG,
    useValue: {}
  }): ModuleWithProviders {
    return {
      ngModule: HttpCacheTageModule,
      providers: [
        configuredProvider,
        HttpCacheTagInterceptor,
        { provide: HTTP_INTERCEPTORS, useExisting: HttpCacheTagInterceptor, multi: true }
        // { provide: CACHE_TAG_CONFIG, useValue: cacheTagConfig }
      ]
    }
  }

  constructor( @Optional() @SkipSelf() parentModule: HttpCacheTageModule) {
    if (parentModule)
      throw new Error('HttpCachTageModule already loaded. Import in root module only.')
  }
}
