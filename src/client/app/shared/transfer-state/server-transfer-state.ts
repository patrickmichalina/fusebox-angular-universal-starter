import { Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core'
import { TransferState } from './transfer-state'
import { PlatformState } from '@angular/platform-server'
@Injectable()
export class ServerTransferState extends TransferState {
  constructor(private state: PlatformState, private rendererFactory: RendererFactory2) {
    super()
  }

  inject() {
    try {
      const document: any = this.state.getDocument()
      const transferStateString = JSON.stringify(this.toJson())
      const renderer = this.rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      })
      const head = document.head
      const script = renderer.createElement('script')
      renderer.setValue(script, `window['PM_UNIVERSAL'] = ${transferStateString}`)
      renderer.appendChild(head, script)
    } catch (e) {
      console.error(e)
    }
  }
}
