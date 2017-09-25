import { EnvironmentService } from './shared/services/environment.service'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module'
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core'
import { NotFoundModule } from './not-found/not-found.module'
import { BrowserModule } from '@angular/platform-browser'
import { APP_ID, ErrorHandler, NgModule } from '@angular/core'
import { HttpConfigInterceptor } from './shared/services/http-config-interceptor.service'
import { HttpCookieInterceptor } from './shared/services/http-cookie-interceptor.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { GlobalErrorHandler } from './shared/services/error-handler.service'
import { SettingService } from './shared/services/setting.service'

export function metaFactory(env: EnvironmentService, ss: SettingService): MetaLoader {
  return new MetaStaticLoader({
    // callback: (key: string) => ts.translate(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: env.config.pageTitleSeparator,
    applicationName: env.config.name,
    applicationUrl: env.config.host,
    defaults: {
      // title: env.config.name,
      // description: env.config.description,
      'og:image': (env.config.og && env.config.og.defaultSocialImage) || '',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US'
    }
  })
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
    { provide: APP_ID, useValue: 'pm-app' }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
