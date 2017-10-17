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
import { fbAdmin } from './server'
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

export function getFirebaseAdmin() {
  return fbAdmin
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
    },
    {
      provide: FIREBASE_ADMIN_INSTANCE,
      useFactory: getFirebaseAdmin
    },
    {
      provide: AngularFireDatabase,
      useFactory: getFirebaseServerModule,
      deps: [FIREBASE_ADMIN_INSTANCE, NgZone, TransferState]
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
