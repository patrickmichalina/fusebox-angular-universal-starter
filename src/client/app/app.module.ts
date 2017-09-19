import { EnvironmentService } from './shared/services/environment.service'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module'
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core'
import { NotFoundModule } from './not-found/not-found.module'
import { BrowserModule, DOCUMENT, ɵgetDOM, ɵTRANSITION_ID } from '@angular/platform-browser'
import { APP_BOOTSTRAP_LISTENER, APP_ID, ErrorHandler, NgModule } from '@angular/core'
import { PlatformService } from './shared/services/platform.service'
import { HttpConfigInterceptor } from './shared/services/http-config-interceptor.service'
import { HttpCookieInterceptor } from './shared/services/http-cookie-interceptor.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { GlobalErrorHandler } from './shared/services/error-handler.service'

export function removeStyleTags(document: HTMLDocument, ps: PlatformService): any {
  // tslint:disable-next-line:only-arrow-functions
  return function(): void {
    if (ps.isBrowser) {
      const dom = ɵgetDOM()

      const styles: HTMLElement[] =
        Array.prototype.slice.apply(dom.querySelectorAll(document, 'style[ng-transition]'))

      styles.forEach(el => dom.remove(el))
    }
  }
}

export function metaFactory(env: EnvironmentService): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: env.config.pageTitleSeparator,
    applicationName: env.config.name,
    applicationUrl: env.config.host,
    defaults: {
      title: env.config.name,
      description: env.config.description,
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
      deps: [EnvironmentService]
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCookieInterceptor, multi: true },
    { provide: APP_ID, useValue: 'pm-app' },
    { provide: ɵTRANSITION_ID, useValue: 'pm-app' },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: removeStyleTags,
      deps: [DOCUMENT, PlatformService],
      multi: true
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
