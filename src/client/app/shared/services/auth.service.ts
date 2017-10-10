import { SettingService } from './setting.service'
import { CookieService } from './cookie.service'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { User } from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { JwtHelper } from 'angular2-jwt'

export interface IAuthService {
  logout(): void
  user$: Observable<User>
}

@Injectable()
export class AuthService implements IAuthService {
  private COOKIE_KEY = 'fbAuth'
  private source = new Subject<User>()
  private jwtHelper = new JwtHelper()
  user$ = this.source.asObservable()

  constructor(private cs: CookieService, private fbAuth: AngularFireAuth, ss: SettingService) {
    // fbAuth.idToken.subscribe(console.log)
    cs.cookies$
      .pluck(this.COOKIE_KEY)
      .filter(Boolean)
      .map(data => {
        const jwtDecoded = this.jwtHelper.decodeToken(data.jwt)
        return {
          ...data,
          id: jwtDecoded.user_id,
          jwtDecoded,
          emailVerified: jwtDecoded.email_verified
        }
      })
      .subscribe(console.log)

    const fbUser$ = this.fbAuth.idToken
      .flatMap(a => a ? a.getIdToken() : Observable.of(undefined), (fbUser, idToken) => ({ fbUser: fbUser ? fbUser : undefined, idToken }))
      .share()

    // fbUser$.subscribe(console.log)

    Observable.combineLatest(fbUser$, ss.settings$, (fbUser, settings) => ({ ...fbUser, ...settings }))
      .subscribe(res => {
        if (!res.idToken) {
          this.logout()
          return
        }

        const expires = this.jwtHelper.getTokenExpirationDate(res.idToken)
        // const claims = jwtHelper.decodeToken(res.idToken)
        // cs.set('fbJwt', res.idToken, { expires })

        // once firebase auth supports native universal data exhange,
        // we are stucking passing the cookies to the server
        if (res.fbUser && res.fbUser.providerData) {
          cs.set(this.COOKIE_KEY, {
            jwt: res.idToken,
            providerId: res.fbUser.providerId,
            displayName: res.fbUser.displayName,
            email: res.fbUser.email,
            photoURL: res.fbUser.photoURL ? res.fbUser.photoURL : res.assets.userAvatarImage,
            phoneNumber: res.fbUser.phoneNumber
          }, { expires })
        }
      })
  }

  login() {

  }

  logout(): void {
    this.cs.remove(this.COOKIE_KEY)
  }
}
