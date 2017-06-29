import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TransferState } from './shared/services/transfer-state.service';

export function getRequest(transferState: TransferState) {
  return transferState.get('req');
}

export function getTransferState(): TransferState {
  const transferState = new TransferState();
  transferState.initialize((<any>window)['PM_UNIVERSAL'] || {});
  return transferState;
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'pm-app'
    }),
    BrowserAnimationsModule,
    AppModule
  ],
  providers: [
    {
      provide: TransferState,
      useFactory: getTransferState
    },
    {
      provide: REQUEST,
      useFactory: getRequest,
      deps: [TransferState]
    }
  ]
})
export class AppBrowserModule { }
