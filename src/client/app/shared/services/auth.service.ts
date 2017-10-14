import { PlatformService } from './platform.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { SettingService } from './setting.service'
import { CookieService } from './cookie.service'
import { Observable } from 'rxjs/Observable'
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { JwtHelper } from 'angular2-jwt'
import { fromPromise } from 'rxjs/observable/fromPromise'
import * as firebase from 'firebase/app'

export interface ExtendedUser {
  id: string
  jwt: Object
  jwtDecoded: Object
  emailVerified: boolean
  displayName: string
  email: string
  phoneNumber: string
  photoURL: string
  providerId: string
}

export interface IAuthService {
  logout(): void
  user$: Observable<ExtendedUser>
}

export const FB_COOKIE_KEY = new InjectionToken<string>('auth.cookie.key')

@Injectable()
export class AuthService implements IAuthService {
  private jwtHelper = new JwtHelper()

  private viaCookies$ = this.cs.cookies$
    .skip(1)
    .map(cookies => {
      return cookies
        ? this.cookieMapper(cookies[this.COOKIE_KEY])
        : undefined
    })

  cookieMapper(data: any): any {
    if (!data || !data.jwt) return undefined
    const jwtDecoded = this.jwtHelper.decodeToken(data.jwt)
    return {
      ...data,
      jwtDecoded,
      id: jwtDecoded.user_id,
      emailVerified: jwtDecoded.email_verified
    }
  }

  private userSource = new BehaviorSubject<ExtendedUser>(this.cookieMapper(this.cs.get(this.COOKIE_KEY)))
  public user$ = this.userSource.asObservable()
  private fbUser$ = this.fbAuth.idToken
    .flatMap(a => a ? a.getIdToken() : Observable.of(undefined), (fbUser, idToken) => ({ fbUser: fbUser ? fbUser : undefined, idToken }))
    .share()
  // private fbUserWithActions$ = this.fbUser$.map(a => a.fbUser)

  constructor(private cs: CookieService, private fbAuth: AngularFireAuth, ss: SettingService, ps: PlatformService,
    @Inject(FB_COOKIE_KEY) private COOKIE_KEY: string) {
    this.viaCookies$.subscribe(a => this.userSource.next(a))

    if (ps.isServer) return

    Observable.combineLatest(this.fbUser$, ss.settings$, (fbUser, settings) => ({ ...fbUser, ...settings }))
      .subscribe(res => {
        if (!res.idToken) {
          this.logout()
          return
        }

        const expires = this.jwtHelper.getTokenExpirationDate(res.idToken)

        // once firebase auth supports native universal data exhange,
        // we are stucking passing the cookies to the server
        if (res.fbUser && res.fbUser.providerData) {
          cs.set(this.COOKIE_KEY, {
            jwt: res.idToken,
            providerId: res.fbUser.providerId,
            displayName: res.fbUser.displayName,
            email: res.fbUser.email,
            photoURL: res.fbUser.photoURL ? res.fbUser.photoURL : res.assets.userAvatarImage,
            phoneNumber: res.fbUser.phoneNumber,
            providers: ((res.fbUser && res.fbUser.providerData) || []).map(a => a && a.providerId)
          }, { expires })
        }
      })
  }

  signInWithFacebookPopup() {
    return this.fbAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

  signInWithGooglePopup() {
    return this.fbAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signInWithGithubPopup() {
    return this.fbAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  }

  signInWithTwitterPopup() {
    return this.fbAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return fromPromise(this.fbAuth.auth.createUserWithEmailAndPassword(email, password))
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return fromPromise(this.fbAuth.auth.signInWithEmailAndPassword(email, password))
  }

  logout(): void {
    this.cs.remove(this.COOKIE_KEY)
  }
}
