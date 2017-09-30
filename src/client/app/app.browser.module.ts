import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser'
import { AppModule, REQ_KEY } from './app.module'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { REQUEST } from '@nguniversal/express-engine/tokens'
// import { ServiceWorkerModule } from '@angular/service-worker'
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
    AppModule
    // ServiceWorkerModule.register('/js/ngsw-worker.js')
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
