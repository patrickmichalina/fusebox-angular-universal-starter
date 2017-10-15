import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http'
import { HttpCacheTagInterceptor } from './http-cache-tag-interceptor.service'

export const CACHE_TAG_CONFIG = new InjectionToken<CacheTagConfig>('app.config.http.cachetag')
export const CACHE_TAG_FACTORY = new InjectionToken<CacheFactory>('app.config.http.cachetag')

export interface CacheTagConfig {
  headerKey: string
  cacheableResponseCodes: number[]
  cacheableUrls?: RegExp,
}

export type CacheFactory = (httpResponse: HttpResponse<any>, config: CacheTagConfig) => void

@NgModule()
export class HttpCacheTagModule {
  static forRoot(configProvider: any, factoryProvider: any): ModuleWithProviders {
    return {
      ngModule: HttpCacheTagModule,
      providers: [
        {
          provide: HttpCacheTagInterceptor,
          useClass: HttpCacheTagInterceptor,
          deps: [CACHE_TAG_CONFIG, CACHE_TAG_FACTORY]
        },
        { provide: HTTP_INTERCEPTORS, useExisting: HttpCacheTagInterceptor, multi: true },
        configProvider,
        factoryProvider
      ]
    }
  }

  constructor( @Optional() @SkipSelf() parentModule: HttpCacheTagModule) {
    if (parentModule)
      throw new Error('HttpCachTageModule already loaded. Import in root module only.')
  }
}
