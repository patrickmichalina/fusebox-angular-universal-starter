import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { APP_ID, APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module'
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core'
import { NotFoundModule } from './not-found/not-found.module'
import { BrowserModule, makeStateKey } from '@angular/platform-browser'
import { EnvironmentService } from './shared/services/environment.service'
import { HttpConfigInterceptor } from './shared/services/http-config-interceptor.service'
import { HttpCookieInterceptor } from './shared/services/http-cookie-interceptor.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { GlobalErrorHandler } from './shared/services/error-handler.service'
import { SettingService } from './shared/services/setting.service'
import { AngularFireModule, FirebaseAppConfigToken, FirebaseAppName } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'

// import { ServiceWorkerModule } from '@angular/service-worker'

export const REQ_KEY = makeStateKey<string>('req')
export const AUTH_TS_KEY = makeStateKey<string>('auth')

export function metaFactory(env: EnvironmentService, ss: SettingService): MetaLoader {
  const locale = 'en' // TODO: make this dynamic
  const urlKey = 'host'
  return new MetaStaticLoader({
    callback: (key: string) => {
      if (key && key.includes(urlKey)) {
        return ss.pluck(urlKey).map(a => a ? key.replace(urlKey, a) : key)
      }
      return (key.includes('i18n')
        ? ss.pluck(key.replace('i18n', `i18n.${locale}`))
        : ss.pluck(key)).map(a => a ? a : '')
    },
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: env.config.pageTitleSeparator,
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

export function firebaseConfigLoader(ss: SettingService) {
  return ss.initialSettings.firebase.config
}

export function firebaseAppNameLoader(ss: SettingService) {
  return ss.initialSettings.firebase.appName
}

export function initialSettingsLoader(ss: SettingService) {
  return () => ss.settings$.take(1).toPromise()
}

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    NotFoundModule,
    TransferHttpModule,
    BrowserModule.withServerTransition({ appId: 'pm-app' }),
    SharedModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    AngularFireModule,
    AngularFireAuthModule,
    // ServiceWorkerModule.register('/ngsw-worker.js'), // TODO: this is broken in JIT
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [EnvironmentService, SettingService]
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCookieInterceptor, multi: true },
    { provide: APP_ID, useValue: 'pm-app' },
    {
      provide: APP_INITIALIZER,
      useFactory: initialSettingsLoader,
      deps: [SettingService],
      multi: true
    },
    {
      provide: FirebaseAppName,
      useFactory: firebaseAppNameLoader,
      deps: [SettingService]
    },
    {
      provide: FirebaseAppConfigToken,
      useFactory: firebaseConfigLoader,
      deps: [SettingService]
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
