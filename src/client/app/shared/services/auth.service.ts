import { PlatformService } from './platform.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { SettingService } from './setting.service'
import { CookieService } from './cookie.service'
import { Observable } from 'rxjs/Observable'
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { JwtHelper } from 'angular2-jwt'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { FirebaseDatabaseService } from './firebase-database.service'
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
  roles: { [key: string]: boolean }
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
    .map(cookies => {
      return cookies
        ? AuthService.cookieMapper(cookies[this.COOKIE_KEY], this.jwtHelper)
        : undefined
    })
    .distinctUntilChanged()
    .share()

  static cookieMapper(data: any, jwtHelper: JwtHelper): any {
    if (!data || !data.jwt && !jwtHelper.isTokenExpired(data.jwt)) return undefined
    const jwtDecoded = jwtHelper.decodeToken(data.jwt)
    return {
      ...data,
      jwtDecoded,
      id: jwtDecoded.user_id,
      emailVerified: jwtDecoded.email_verified
    }
  }

  private userSource = new BehaviorSubject<ExtendedUser>(AuthService.cookieMapper(this.cs.get(this.COOKIE_KEY), this.jwtHelper))
  public user$ = this.userSource.asObservable()
  public isAdmin$ = this.user$.map(a => a && a.roles && (a.roles.admin || a.roles.superadmin))
  private fbUser$ = this.fbAuth.idToken
    .flatMap(a => a ? a.getIdToken() : of(undefined), (fbUser, idToken) => ({ fbUser: fbUser ? fbUser : undefined, idToken }))
    .debounceTime(500)

  constructor(private cs: CookieService, private fbAuth: AngularFireAuth, ss: SettingService, private ps: PlatformService,
    private db: FirebaseDatabaseService, @Inject(FB_COOKIE_KEY) private COOKIE_KEY: string) {
    this.viaCookies$.subscribe(a => this.userSource.next(a))

    if (ps.isServer) return

    combineLatest(this.fbUser$, ss.settings$, (fbUser, settings) => ({ ...fbUser, ...settings }))
      .flatMap(res => {
        if (res.fbUser && res.fbUser.uid) {
          return this.db
            .get(`users/${res.fbUser.uid}`)
            .map(a => a ? (a as any).roles : {})
        } else {
          return of(res)
        }
      }, (user, roles) => {
        return {
          ...user,
          roles: {
            ...roles
          }
        }
      })
      .subscribe(res => {
        if (!res || !res.idToken) {
          this.logout()
          return
        }

        const expires = this.jwtHelper.getTokenExpirationDate(res.idToken)

        // once firebase auth supports native universal data exhange,
        // we are stucking passing the cookies to the server
        if (res.fbUser && res.fbUser.providerData) {
          const important = {
            jwt: res.idToken,
            roles: res.roles,
            providerId: res.fbUser.providerId,
            displayName: res.fbUser.displayName,
            email: res.fbUser.email,
            photoURL: res.fbUser.photoURL ? res.fbUser.photoURL : res.assets.userAvatarImage,
            phoneNumber: res.fbUser.phoneNumber,
            providers: ((res.fbUser && res.fbUser.providerData) || []).map(a => a && a.providerId)
          }

          cs.set(this.COOKIE_KEY, important, { expires })

          this.db
            .getObjectRef(`users/${res.fbUser.uid}`)
            .update({
              displayName: res.fbUser.displayName,
              email: important.email,
              photo: important.photoURL,
              providers: important.providers
            })
            .catch(() => undefined)
        }
      })
  }

  signInWithFacebookRedirect() {
    return fromPromise(this.fbAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()))
  }

  signInWithGoogleRedirect() {
    return fromPromise(this.fbAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()))
  }

  signInWithGithubRedirect() {
    return fromPromise(this.fbAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider()))
  }

  signInWithTwitterRedirect() {
    return fromPromise(this.fbAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider()))
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return fromPromise(this.fbAuth.auth.createUserWithEmailAndPassword(email, password))
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return fromPromise(this.fbAuth.auth.signInWithEmailAndPassword(email, password))
  }

  logout() {
    if (this.ps.isBrowser) {
      return this.fbAuth.auth.signOut()
        .then(() => this.cs.remove(this.COOKIE_KEY))
    }
  }

  refreshEmailCredentials(paswword: string) {
    return this.fbUser$
      .map(a => a.fbUser)
      .map(user => {
        if (!user) return Observable.throw('missing user')
        return {
          user,
          credentials: firebase.auth.EmailAuthProvider.credential(user.email as string, paswword)
        }
      })
  }

  updateEmailPassword(currentPassword: string, newPassword: string) {
    return this.refreshEmailCredentials(currentPassword)
      .flatMap((userObj: {
        user: firebase.User,
        credentials: firebase.auth.AuthCredential
      }) => userObj.user.reauthenticateWithCredential(userObj.credentials), (userObj: {
        user: firebase.User,
        credentials: firebase.auth.AuthCredential
      }, res) => userObj.user)
      .flatMap(user => user.updatePassword(newPassword))
  }

  updateProfile(displayName?: string, photoURL?: string) {
    return this.fbUser$
      .map(a => a.fbUser)
      .flatMap(user => {
        if (!user) return Observable.throw('missing user')
        return user.updateProfile({
          // tslint:disable:no-null-keyword
          displayName: displayName || null,
          photoURL: photoURL || null
        })
      }, (user, e) => user)
      .flatMap(user => user ? user.getIdToken(true) : of(undefined))
      .flatMap(() => this.fbAuth.idToken)
  }
}
