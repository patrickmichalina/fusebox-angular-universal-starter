import { APP_ID, ErrorHandler, NgModule } from '@angular/core'
import { EnvironmentService } from './shared/services/environment.service'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module'
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core'
import { NotFoundModule } from './not-found/not-found.module'
import { BrowserModule, makeStateKey } from '@angular/platform-browser'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { HttpConfigInterceptor } from './shared/services/http-config-interceptor.service'
import { HttpCookieInterceptor } from './shared/services/http-cookie-interceptor.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { GlobalErrorHandler } from './shared/services/error-handler.service'
import { SettingService } from './shared/services/setting.service'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AUTH_CONFIG, IAuthServiceConfig, AuthService } from './shared/services/auth.service'

// import { ServiceWorkerModule } from '@angular/service-worker'

export const authConfg: IAuthServiceConfig = {
  authTokenStorageKey: 'jwt_token',
  authTokenPayloadKey: 'token',
  cookieDomain: 'scowtee',
  tokenSchema: {
    id: 'id',
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    roles: 'roles',
    roleDelimeter: ',',
    adminRoleNames: ['ROLE_ADMIN'],
    adFreeRoleNames: ['ROLE_AD_FREE']
  },
  userFactory: (tokenJson: any, schema: ITokenSchema): IUserIdentity => {

    if (!tokenJson) throw new Error('')
    if (!schema) throw new Error('')

    const roles = tokenJson[schema.roles] as string[] || []
    const roleSet = new Set<string>()

    Array.isArray(roles)
      ? roles.forEach(role => roleSet.add(role))
      : roleSet.add(roles)

    const user: IUserIdentity = {
      claims: tokenJson,
      analyticsData: tokenJson[schema.analyticsData] as IAnalyticsData,
      id: tokenJson[schema.id] as string,
      username: tokenJson[schema.username] as string,
      email: tokenJson[schema.email] as string,
      roles: roleSet,
      isInRole(name: string) {
        return roleSet.has(name)
      },
      isAdmin() {
        return schema.adminRoleNames.some(role => roleSet.has(role))
      },
      isPremium() {
        return tokenJson.isPremiumSubscriber
      },
      isAdFree() {
        return schema.adFreeRoleNames.some(role => roleSet.has(role))
      }
    }

    return user
  }
}



export const REQ_KEY = makeStateKey<string>('req')

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

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    NotFoundModule,
    TransferHttpModule,
    BrowserModule.withServerTransition({ appId: 'pm-app' }),
    SharedModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC1gmUNs2mtG0K5Yt_Zy14pDve5MG26FQ0',
      authDomain: 'fuse-angular-universal-starter.firebaseapp.com',
      databaseURL: 'https://fuse-angular-universal-starter.firebaseio.com',
      projectId: 'fuse-angular-universal-starter',
      storageBucket: '<your-storage-bucket>',
      messagingSenderId: '146311846251'
    }, 'fuse-angular-universal-starter'),
    AngularFireAuthModule,
    // ServiceWorkerModule.register('/ngsw-worker.js'), // TODO: this is broken in JIT
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [EnvironmentService, SettingService]
    })
  ],
  providers: [
    { provide: AUTH_CONFIG, useValue: authConfg },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCookieInterceptor, multi: true },
    { provide: APP_ID, useValue: 'pm-app' },
    AuthService
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
