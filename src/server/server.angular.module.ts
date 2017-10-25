import { CookieService } from './../client/app/shared/services/cookie.service'
import { AuthService, FB_COOKIE_KEY } from './../client/app/shared/services/auth.service'
import { EnvironmentService } from './../client/app/shared/services/environment.service'
import { FB_SERVICE_ACCOUNT_CONFIG } from './server.config'
import { TransferState } from '@angular/platform-browser'
import { Subject } from 'rxjs/Subject'
import { AngularFireAuth } from 'angularfire2/auth'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, enableProdMode, Inject, NgModule, NgZone } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { AppComponent } from './../client/app/app.component'
import { EnvConfig } from '../../tools/config/app.config'
import { AppModule, REQ_KEY } from './../client/app/app.module'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { AngularFireDatabase } from 'angularfire2/database'
import { FIREBASE_ADMIN_INSTANCE, FirebaseAdminService } from './server.angular-fire.service'
import { JwtHelper } from 'angular2-jwt'
import { MinifierService } from '../client/app/shared/services/minifier.service'
import * as express from 'express'
import * as cleanCss from 'clean-css'
import * as admin from 'firebase-admin'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/first'
import '../client/operators'

declare var __process_env__: EnvConfig

if (__process_env__.env !== 'dev') enableProdMode()

export function onBootstrap(appRef: ApplicationRef, transferState: TransferState, req: express.Request) {
  return () => {
    appRef.isStable
      .filter(stable => stable)
      .first()
      .subscribe(() => {
        transferState.set<any>(REQ_KEY, {
          hostname: req.hostname,
          originalUrl: req.originalUrl
        })
      })
  }
}

export function createAngularFireServer(req: express.Request, transferState: TransferState) {
  return new AngularFireServer(req, transferState)
}

export function getFirebaseAdmin(env: EnvironmentService, cookies: CookieService, cookieKey: string) {
  const userToken = cookies.get(cookieKey)
  const jwtHelper = new JwtHelper()
  const user = AuthService.cookieMapper(userToken, jwtHelper) || {}
  const userId = user.id || 'anon'
  const app = admin.apps.find((a: any) => a.name === userId)

  if (app) return app
  return admin.initializeApp({
    credential: admin.credential.cert(FB_SERVICE_ACCOUNT_CONFIG),
    databaseURL: env.config.firebase.config.databaseURL,
    databaseAuthVariableOverride: new Map([['uid', userId]])
  }, userId)
}

export function getFirebaseServerModule(d: any, zone: NgZone, ts: TransferState) {
  return new FirebaseAdminService(d, zone, ts)
}

@NgModule({
  imports: [
    ServerModule,
    ServerTransferStateModule,
    AppModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState,
        REQUEST,
        CookieService, FB_COOKIE_KEY
      ]
    },
    {
      provide: AngularFireAuth,
      useFactory: createAngularFireServer,
      deps: [
        REQUEST,
        TransferState
      ]
    },
    {
      provide: FIREBASE_ADMIN_INSTANCE,
      useFactory: getFirebaseAdmin,
      deps: [EnvironmentService, CookieService, FB_COOKIE_KEY]
    },
    {
      provide: AngularFireDatabase,
      useFactory: getFirebaseServerModule,
      deps: [FIREBASE_ADMIN_INSTANCE, NgZone, TransferState]
    },
    {
      provide: MinifierService,
      useValue: {
        css(css: string): string {
          return new cleanCss({}).minify(css).styles || css
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }

export class AngularFireServer {

  authSource = new ReplaySubject<any | undefined>(1)
  idToken = this.authSource.asObservable()

  constructor( @Inject(REQUEST) private req: any, ts: TransferState) {

    const jwt = this.req.cookies['fbJwt']
    const providerId = this.req.cookies['fbProviderId']
    const displayName = this.req.cookies['fbDisplayName']
    const email = this.req.cookies['fbEmail']
    const photoURL = this.req.cookies['fbPhotoURL']
    const phoneNumber = this.req.cookies['fbPhoneNumber']

    const authData = {
      providerId,
      displayName,
      email,
      photoURL,
      phoneNumber
    }

    if (jwt) {
      this.authSource.next({
        getIdToken: () => {
          return new Promise((resolve: any) => {
            resolve(jwt)
          })
        },
        authState: new Subject(),
        ...authData
      })
    } else {
      this.authSource.next(undefined)
    }
  }
}
