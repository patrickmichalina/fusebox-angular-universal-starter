import { JwtHelper } from 'angular2-jwt'
import { Observable } from 'rxjs/Observable'
import { CookieService } from './shared/services/cookie.service'
import { PlatformService } from './shared/services/platform.service'
import { Injectable } from '../../server/api/repositories/setting.repository'
import { HttpClient } from '@angular/common/http'
import { WebSocketService } from './shared/services/web-socket.service'
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core'
import { DOCUMENT, Meta, TransferState } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'
import { sha1 } from 'object-hash'
import { AngularFireAuth } from 'angularfire2/auth'
import { MatIconRegistry } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public user$ = this.afAuth.idToken.map(user => {
    if (!user) return undefined
    return {
      email: user.email,
      photoURL: user.photoURL,
      name: user.displayName
    }
  })

  constructor(ss: SettingService, meta: Meta, analytics: Angulartics2GoogleAnalytics, wss: WebSocketService,
    renderer: Renderer2, @Inject(DOCUMENT) doc: HTMLDocument, http: HttpClient, private afAuth: AngularFireAuth,
    matIconRegistry: MatIconRegistry, ps: PlatformService, router: Router, cs: CookieService, ts: TransferState) {

    const fbUser$ = this.afAuth.idToken
      .flatMap(a => a ? a.getIdToken() : Observable.of(undefined), (fbUser, jwt) => ({ fbUser, jwt }))

    Observable.combineLatest(fbUser$, ss.settings$, (fbUser, settings) => ({ ...fbUser, ...settings }))
      .subscribe(res => {
        if (res.jwt) {
          const jwtHelper = new JwtHelper()
          const expires = jwtHelper.getTokenExpirationDate(res.jwt)
          const claims = jwtHelper.decodeToken(res.jwt)
          cs.set('fbJwt', res.jwt, { expires })

          // once firebase auth supports native universal data exhange,
          // we are stucking passing the cookies to the server
          if (res.fbUser && res.fbUser.providerData) {
            if (res.fbUser.providerId) cs.set('fbProviderId', res.fbUser.providerId, { expires })
            if (res.fbUser.displayName) cs.set('fbDisplayName', res.fbUser.displayName, { expires })
            if (res.fbUser.email) cs.set('fbEmail', res.fbUser.email, { expires })
            if (res.fbUser.photoURL) cs.set('fbPhotoURL', res.fbUser.photoURL, { expires })
            if (res.fbUser.phoneNumber) cs.set('fbPhoneNumber', res.fbUser.phoneNumber, { expires })
          }

          if (ps.isBrowser) {
            analytics.setUsername(res.fbUser.uid)
            analytics.setUserProperties({
              email: res.fbUser.email,
              displayName: res.fbUser.displayName,
              name: claims.name,
              signInProvider: claims.firebase.sign_in_provider
            })
          }
        } else {
          cs.remove('fbJwt')
          cs.remove('fbPhotoURL')
          cs.remove('fbProviderId')
          cs.remove('fbEmail')
          cs.remove('fbDisplayName')
        }
      })

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
