import { AppComponent } from './../client/app/app.component';
import { AppModule } from './../client/app/app.module';
import { NgModule, enableProdMode } from '@angular/core';
import { ServerModule, } from '@angular/platform-server';
import { ApplicationRef, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { TransferState } from '../client/app/modules/transfer-state/transfer-state';
import { ServerTransferStateModule } from '../client/app/modules/transfer-state/server-transfer-state.module';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import '../client/operators';

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') enableProdMode();

export function bootstrapFactory(appRef: ApplicationRef, transferState: TransferState): () => Subscription {
  return () => appRef.isStable
    .filter(stable => stable)
    .first()
    .subscribe(() => transferState.inject());
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
