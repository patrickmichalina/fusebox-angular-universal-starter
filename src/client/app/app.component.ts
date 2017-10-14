import { PlatformService } from './shared/services/platform.service'
import { HttpCacheDirective, ServerResponseService } from './shared/services/server-response.service'
import { CookieService } from './shared/services/cookie.service'
import { AuthService } from './shared/services/auth.service'
import { Injectable } from '../../server/api/repositories/setting.repository'
import { HttpClient } from '@angular/common/http'
import { WebSocketService } from './shared/services/web-socket.service'
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core'
import { DOCUMENT, Meta, TransferState } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'
import { sha1 } from 'object-hash'
import { MatIconRegistry } from '@angular/material'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public user$ = this.auth.user$

  constructor(ss: SettingService, meta: Meta, analytics: Angulartics2GoogleAnalytics, wss: WebSocketService,
    renderer: Renderer2, @Inject(DOCUMENT) doc: HTMLDocument, http: HttpClient, matIconRegistry: MatIconRegistry,
    ps: PlatformService, router: Router, cs: CookieService, ts: TransferState, ar: ActivatedRoute, private auth: AuthService,
    srs: ServerResponseService) {

    matIconRegistry.registerFontClassAlias('fontawesome', 'fa')

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

    // todo: move this to a module
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => ar)
      .map(route => {
        while (route.firstChild) route = route.firstChild
        return route
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .map(data => data['response'])
      .subscribe((response: {
        cache: { directive: HttpCacheDirective, maxage?: string, smaxage?: string },
        headers: { [key: string]: string }
      }) => {
        if (response && response.cache) {
          if (response.cache.directive === 'private') {
            srs.setCachePrivate()
          } else {
            srs.setCache(response.cache.directive, response.cache.maxage, response.cache.smaxage)
          }
        } else {
          // set default cache
          srs.setCache('public', '7d', '7d')
        }
        if (response && response.headers) {
          srs.setHeaders(response.headers)
        }
      })

    // TODO move this to a module
    if (ps.isBrowser) {
      wss.messageBus$.subscribe()
      wss.send({ message: 'ws test' })
    }
  }

  inject(doc: HTMLDocument, renderer: Renderer2, injectable: Injectable) {
    const st = renderer.createElement(injectable.element) as HTMLElement
    const id = sha1(JSON.stringify(injectable))

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
