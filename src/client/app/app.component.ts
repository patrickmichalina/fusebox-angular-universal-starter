import { HttpClient } from '@angular/common/http'
import { WebSocketService } from './shared/services/web-socket.service'
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core'
import { DOCUMENT, Meta } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(ss: SettingService, meta: Meta, analytics: Angulartics2GoogleAnalytics, private wss: WebSocketService,
    renderer: Renderer2, @Inject(DOCUMENT) doc: HTMLDocument, http: HttpClient) {

    ss.settings$
      .take(1)
      .subscribe(s => meta.addTag({ property: 'fb:app_id', content: s.tokens.facebookAppId }))

    http.get('./css/main.css', { responseType: 'text' })
      .take(1)
      .subscribe(css => this.injectStyles(doc, renderer, css))

    this.wss.messageBus$.subscribe()
    this.wss.send({ message: 'ws test' })
  }

  injectStyles(doc: HTMLDocument, renderer: Renderer2, css: string) {
    const st = renderer.createElement('style')
    renderer.setValue(st, css)
    renderer.appendChild(doc.head, st)
  }
}
