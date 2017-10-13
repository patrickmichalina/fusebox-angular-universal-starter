import { Subject } from 'rxjs/Subject'
import { AppModule, AUTH_TS_KEY, REQ_KEY } from './../client/app/app.module'
import { AngularFireAuth } from 'angularfire2/auth'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, enableProdMode, Inject, NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { AppComponent } from './../client/app/app.component'
import { EnvConfig } from '../../tools/config/app.config'
import { TransferState } from '@angular/platform-browser'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import * as express from 'express'
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
        REQUEST
      ]
    },
    {
      provide: AngularFireAuth,
      useFactory: createAngularFireServer,
      deps: [
        REQUEST,
        TransferState
      ]
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

    ts.set(AUTH_TS_KEY, authData)
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
