import { EnvConfig } from '../../tools/config/app.config'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, enableProdMode, NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { AppModule, REQ_KEY } from './../client/app/app.module'
import { AppComponent } from './../client/app/app.component'
import { TransferState } from '@angular/platform-browser'
import * as express from 'express'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/first'
import '../client/operators'

declare var __process_env__: EnvConfig

if (__process_env__.env !== 'prod') enableProdMode()

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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
