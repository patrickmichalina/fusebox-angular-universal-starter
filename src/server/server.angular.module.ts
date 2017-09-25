import { AppComponent } from './../client/app/app.component'
import { AppModule } from './../client/app/app.module'
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, enableProdMode, NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
import { TransferState } from '../client/app/shared/transfer-state/transfer-state'
import { ServerTransferStateModule } from '../client/app/shared/transfer-state/server-transfer-state.module'
import { Subscription } from 'rxjs/Subscription'
import { EnvConfig } from '../../tools/config/app.config'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/first'
import '../client/operators'

declare var __process_env__: EnvConfig

if (__process_env__.env !== 'prod') enableProdMode()

export function bootstrapFactory(appRef: ApplicationRef, transferState: TransferState): () => Subscription {
  return () => appRef.isStable
    .filter(stable => stable)
    .first()
    .subscribe(() => transferState.inject())
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
      useFactory: bootstrapFactory,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
