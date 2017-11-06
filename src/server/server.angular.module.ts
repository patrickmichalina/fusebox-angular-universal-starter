import { CookieService } from './../client/app/shared/services/cookie.service'
import { FB_COOKIE_KEY } from './../client/app/shared/services/auth.service'
import { TransferState } from '@angular/platform-browser'
import { Subject } from 'rxjs/Subject'
import { AngularFireAuth } from 'angularfire2/auth'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, enableProdMode, Inject, NgModule, NgZone } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { AppComponent } from './../client/app/app.component'
import { EnvConfig } from '../../tools/config/app.config'
import { AppModule, REQ_KEY } from './../client/app/app.module'
import { AngularFireDatabase } from 'angularfire2/database'
import { FirebaseAdminService } from './server.angular-fire.service'
import { MinifierService } from '../client/app/shared/services/minifier.service'
import * as express from 'express'
import * as cleanCss from 'clean-css'
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
          originalUrl: req.originalUrl,
          referer: req.get('referer')
        })
      })
  }
}

export function createAngularFireServer(req: express.Request, transferState: TransferState) {
  return new AngularFireServer(req, transferState)
}

export function getFirebaseServerModule(zone: NgZone, ts: TransferState) {
  return new FirebaseAdminService(zone, ts)
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
      provide: AngularFireDatabase,
      useFactory: getFirebaseServerModule,
      deps: [NgZone, TransferState]
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

  authSource = new Subject<any | undefined>()
  idToken = this.authSource.asObservable()

  constructor( @Inject(REQUEST) private req: any, ts: TransferState) {
    const fbAuth = JSON.parse(this.req.cookies['fbAuth'] || '{}')
    if (fbAuth.jwt) {
      this.authSource.next({
        getIdToken: () => {
          return new Promise((resolve: any) => {
            resolve(fbAuth.jwt)
          })
        },
        authState: new Subject(),
        ...fbAuth
      })
    } else {
      this.authSource.next(undefined)
    }
  }
}
