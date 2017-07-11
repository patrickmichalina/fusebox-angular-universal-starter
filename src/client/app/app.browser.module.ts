import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { BrowserTransferStateModule } from './shared/transfer-state/browser-transfer-state.module';
import { TransferState } from './shared/transfer-state/transfer-state';
import { ServerTransition } from './server-trans';

export function getRequest(transferState: TransferState) {
  return transferState.get('req');
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // BrowserModule.withServerTransition({
    //   appId: 'pm-app'
    // }),
    ServerTransition.forRoot({ appId: 'pm-app' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppModule
  ],
  providers: [
    {
      provide: REQUEST,
      useFactory: getRequest,
      deps: [TransferState]
    }
  ]
})
export class AppBrowserModule { }
