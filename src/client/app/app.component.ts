import { ISetting } from './../../server/api/repositories/setting.repository'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { PlatformService } from './shared/services/platform.service'
import { HttpCacheDirective, ServerResponseService } from './shared/services/server-response.service'
import { CookieService } from './shared/services/cookie.service'
import { AuthService } from './shared/services/auth.service'
import { HttpClient } from '@angular/common/http'
import { WebSocketService } from './shared/services/web-socket.service'
import { DOCUMENT, TransferState } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga'
import { MatIconRegistry, MatSidenav, MatSlideToggle } from '@angular/material'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { InjectionService } from './shared/services/injection.service'
import { MinifierService } from './shared/services/minifier.service'
import { SEOService } from './shared/services/seo.service'
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  Inject, QueryList, Renderer2, ViewChild, ViewChildren
} from '@angular/core'

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav
  @ViewChild(MatSlideToggle) toggle: MatSlideToggle
  @ViewChildren('out', { read: ElementRef }) menuButtons: QueryList<ElementRef>

  public user$ = this.auth.user$
  public menuMode = 'over'

  constructor(ss: SettingService, analytics: Angulartics2GoogleAnalytics, wss: WebSocketService,
    renderer: Renderer2, @Inject(DOCUMENT) doc: HTMLDocument, http: HttpClient, matIconRegistry: MatIconRegistry,
    ps: PlatformService, router: Router, cs: CookieService, ts: TransferState, ar: ActivatedRoute, private auth: AuthService,
    srs: ServerResponseService, domInjector: InjectionService, mini: MinifierService, seo: SEOService, @Inject(REQUEST) req: any
    ) {
      matIconRegistry.registerFontClassAlias('fontawesome', 'fa')
    ss.settings$
      .take(1)
      .filter(Boolean)
      .subscribe((settings: ISetting) => {
        if (settings.tokens) seo.updateFbAppId(settings.tokens.facebookAppId)
        settings.injections.filter(Boolean).forEach(link => domInjector.inject(renderer, link))
      })

    ss.settings$
      .flatMap(settigns => router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => ar)
        .map(route => {
          seo.updateUrl(doc.location.href)
          while (route.firstChild) route = route.firstChild
          return route
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .map(data => data['response']))
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

  ngAfterViewInit() {
    this.toggle.change
      .map(a => a.checked)
      .subscribe(checked => {
        if (!checked) this.sidenav.close()
        checked
          ? this.menuMode = 'side'
          : this.menuMode = 'over'
      })
    this.menuButtons
      .map(a => a.nativeElement as HTMLAnchorElement)
      .forEach(a => a.addEventListener('click', () => this.handleOutsideClicks()))
  }

  handleOutsideClicks() {
    if (this.menuMode === 'side') return
    this.sidenav.close()
  }
}
