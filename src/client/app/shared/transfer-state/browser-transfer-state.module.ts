import { NgModule } from '@angular/core'
import { TransferState } from './transfer-state'

export function getTransferState(): TransferState {
  const transferState = new TransferState()
  transferState.initialize((window as any)['PM_UNIVERSAL'] || {})
  return transferState
}

@NgModule({
  providers: [
    {
      provide: TransferState,
      useFactory: getTransferState
    }
  ]
})
export class BrowserTransferStateModule {

}
