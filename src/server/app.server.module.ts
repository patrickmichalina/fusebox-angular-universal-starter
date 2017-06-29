import { AppComponent } from './../client/app/app.component';
import { AppModule } from './../client/app/app.module';
import { NgModule, enableProdMode } from '@angular/core';
import { ServerModule, } from '@angular/platform-server';
import { ApplicationRef, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { ServerTransferState } from '../client/app/shared/services/transfer-server-state.service';
import { TransferState } from '../client/app/shared/services/transfer-state.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

if (process.env.NODE_ENV === 'production') enableProdMode();

export function bootstrapFactory(appRef: ApplicationRef, transferState: TransferState): () => Subscription {
  return () => appRef.isStable
    .filter(stable => stable)
    .first()
    .subscribe(() => transferState.inject());
}

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  providers: [
    { provide: TransferState, useClass: ServerTransferState },
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
