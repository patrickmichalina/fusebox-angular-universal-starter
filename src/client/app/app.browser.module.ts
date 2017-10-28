import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser'
import { AppModule, REQ_KEY } from './app.module'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import 'hammerjs'

export function getRequest(transferState: TransferState): any {
  return transferState.get<any>(REQ_KEY, {})
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'pm-app' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    // ServiceWorkerModule.register('/ngsw-worker.js'),
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
