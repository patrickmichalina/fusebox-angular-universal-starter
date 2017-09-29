import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser'
import { AppModule } from './app.module'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import 'hammerjs'

export const REQ_KEY = makeStateKey<string>('req')

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
