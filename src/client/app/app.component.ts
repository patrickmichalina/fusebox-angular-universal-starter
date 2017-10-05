import { Injectable } from '../../server/api/repositories/setting.repository'
import { HttpClient } from '@angular/common/http'
import { WebSocketService } from './shared/services/web-socket.service'
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core'
import { DOCUMENT, Meta } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'
import { keysMD5 } from 'object-hash'

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
      .subscribe(settings => {
        meta.addTag({ property: 'fb:app_id', content: settings.tokens.facebookAppId })
        settings.injections.forEach(link => this.inject(doc, renderer, link))
      })

    http.get('./css/main.css', { responseType: 'text' })
      .take(1)
      .subscribe(css => this.inject(doc, renderer, {
        value: css,
        element: 'style',
        inHead: true
      }))

    this.wss.messageBus$.subscribe()
    this.wss.send({ message: 'ws test' })
  }

  inject(doc: HTMLDocument, renderer: Renderer2, injectable: Injectable) {
    const st = renderer.createElement(injectable.element) as HTMLElement
    const id = keysMD5(injectable)

    if (doc.getElementById(id)) return

    renderer.setProperty(st, 'id', id)
    if (injectable.value) renderer.setValue(st, injectable.value)

    Object.keys(injectable.attributes || {})
      .forEach(key => renderer.setAttribute(st, key, (injectable.attributes || {})[key] as any))

    injectable.inHead
      ? renderer.appendChild(doc.head, st)
      : renderer.appendChild(doc.body, st)
  }
}
