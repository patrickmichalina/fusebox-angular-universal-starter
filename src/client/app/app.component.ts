import { PlatformService } from './shared/services/platform.service'
import { HttpCacheDirective, ServerResponseService } from './shared/services/server-response.service'
import { CookieService } from './shared/services/cookie.service'
import { AuthService } from './shared/services/auth.service'
import { HttpClient } from '@angular/common/http'
import { WebSocketService } from './shared/services/web-socket.service'
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core'
import { DOCUMENT, Meta, TransferState } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'
import { MatIconRegistry } from '@angular/material'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { InjectionService } from './shared/services/injection.service'
import { MinifierService } from './shared/services/minifier.service'

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
    srs: ServerResponseService, domInjector: InjectionService, mini: MinifierService) {

    matIconRegistry.registerFontClassAlias('fontawesome', 'fa')

    ss.settings$
      .take(1)
      .subscribe(settings => {
        meta.addTag({ property: 'fb:app_id', content: settings.tokens.facebookAppId })
        settings.injections.filter(Boolean).forEach(link => domInjector.inject(renderer, link))
      })

    http.get('./css/main.css', { responseType: 'text' })
      .take(1)
      .subscribe(css => domInjector.inject(renderer, {
        value: mini.css(css),
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

    // Uncomment to turn on direct web-socket connection with server
    // if (ps.isBrowser) {
    //   wss.messageBus$.subscribe()
    //   wss.send({ message: 'ws test' })
    // }
  }
}
