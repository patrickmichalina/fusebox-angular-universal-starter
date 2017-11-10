import { ErrorHandler, NgModule } from '@angular/core'
import { HttpConfigInterceptor } from './shared/services/http-config-interceptor.service'
import { HttpCookieInterceptor } from './shared/services/http-cookie-interceptor.service'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core'
import { NotFoundModule } from './not-found/not-found.module'
import { BrowserModule, makeStateKey } from '@angular/platform-browser'
import { EnvironmentService } from './shared/services/environment.service'
import { ServerResponseService } from './shared/services/server-response.service'
import { Angulartics2Module } from 'angulartics2'
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga'
import { HTTP_INTERCEPTORS, HttpClientModule, HttpResponse } from '@angular/common/http'
import { GlobalErrorHandler } from './shared/services/error-handler.service'
import { SettingService } from './shared/services/setting.service'
import { AngularFireModule, FirebaseAppConfigToken, FirebaseAppName } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { TransferHttpCacheModule } from '@nguniversal/common'
import { AuthService, FB_COOKIE_KEY } from './shared/services/auth.service'
import { CACHE_TAG_CONFIG, CACHE_TAG_FACTORY, CacheTagConfig, HttpCacheTagModule } from './shared/http-cache-tag/http-cache-tag.module'

export const REQ_KEY = makeStateKey<string>('req')

export function metaFactory(env: EnvironmentService, ss: SettingService): MetaLoader {
  const locale = 'en' // TODO: make this dynamic
  const urlKey = 'host'
  return new MetaStaticLoader({
    callback: (key: string) => {
      if (key && key.includes(urlKey)) {
        return key.replace(urlKey, env.config.host)
      }
      return (key.includes('i18n')
        ? ss.pluck(key.replace('i18n', `i18n.${locale}`))
        : ss.pluck(key)).map(a => a ? a : '')
    },
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'og.title',
    applicationUrl: 'host',
    defaults: {
      title: 'og.title',
      description: 'og.description',
      'og:image': 'og.image',
      'og:type': 'og.type',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US'
    }
  })
}

export function firebaseConfigLoader(env: EnvironmentService) {
  return env.config.firebase.config
}

export function firebaseAppNameLoader(env: EnvironmentService) {
  return env.config.firebase.appName
}

export function cacheTagFactory(srs: ServerResponseService): any {
  return (httpResponse: HttpResponse<any>, config: CacheTagConfig) => {
    const cacheHeader = httpResponse.headers.get(config.headerKey)
    if (cacheHeader) {
      srs.appendHeader(config.headerKey, cacheHeader)
    }
  }
}

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    NotFoundModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TransferHttpCacheModule,
    SharedModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    BrowserModule.withServerTransition({ appId: 'pm-app' }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [EnvironmentService, SettingService]
    }),
    HttpCacheTagModule.forRoot(
      {
        provide: CACHE_TAG_CONFIG,
        useValue: {
          headerKey: 'Cache-Tag',
          cacheableResponseCodes: [200]
        }
      },
      {
        provide: CACHE_TAG_FACTORY,
        useFactory: cacheTagFactory,
        deps: [ServerResponseService]
      })
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCookieInterceptor, multi: true },
    { provide: FB_COOKIE_KEY, useValue: 'fbAuth' },
    {
      provide: FirebaseAppName,
      useFactory: firebaseAppNameLoader,
      deps: [EnvironmentService]
    },
    {
      provide: FirebaseAppConfigToken,
      useFactory: firebaseConfigLoader,
      deps: [EnvironmentService]
    },
    AuthService
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
