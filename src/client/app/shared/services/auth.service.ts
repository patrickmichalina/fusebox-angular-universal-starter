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
import { FirebaseDatabaseService } from './firebase-database.service'
import * as firebase from 'firebase/app'
import { Router } from '@angular/router'
import { User } from 'firebase'

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
  user$: Observable<ExtendedUser>
  logout(): void
  redirectToSignInPage(): void
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
    .shareReplay()

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
  public isAdmin$ = this.user$.map(user => this.isAdmin(user))
  public isAdmin(user: ExtendedUser) {
    return user && user.roles && (user.roles.admin || user.roles.superadmin)
  }

  constructor(private cs: CookieService, private fbAuth: AngularFireAuth, ss: SettingService, private ps: PlatformService,
    private db: FirebaseDatabaseService, @Inject(FB_COOKIE_KEY) private COOKIE_KEY: string, private router: Router) {
    this.viaCookies$.subscribe(a => this.userSource.next(a))

    if (ps.isServer) return

    this.fbAuth.authState
      .filter(a => a !== null)
      .map(a => a as User)
      .flatMap(a => this.db
        .getObjectRef(`users/${a.uid}`)
        .update({
          displayName: a.displayName,
          email: a.email,
          photo: a.photoURL,
          providers: (a.providerData || []).map((b: any) => b && b.providerId),
          updated: new Date().toUTCString()
        })
        .catch(() => undefined), user => user)
      .flatMap(a => a.getIdToken(), (user, token) => ({ user, token }))
      .flatMap(a => this.db
        .get(`users/${a.user.uid}`)
        .map((b: any) => b && b.roles || {})
        .catch(() => Observable.of(undefined)), (res, roles) => ({ roles, ...res }))
      .flatMap(a => ss.settings$, (user, settings) => ({ ...user, settings }))
      .subscribe(res => {
        if (!res.roles) return
        if (res.user.providerData) {
          const expires = this.jwtHelper.getTokenExpirationDate(res.token as string)
          const important = {
            jwt: res.token,
            roles: res.roles,
            providerId: res.user.providerId,
            displayName: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL ? res.user.photoURL : res.settings.assets.userAvatarImage,
            phoneNumber: res.user.phoneNumber,
            providers: ((res && res.user.providerData) || []).map((a: any) => a && a.providerId)
          }
          cs.set(this.COOKIE_KEY, important, { expires })
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

  redirectToSignInPage() {
    this.router.navigate(['login'], { queryParams: { redirect: this.router.url }, skipLocationChange: true })
  }

  logout() {
    if (this.ps.isBrowser) {
      this.fbAuth.auth
        .signOut()
        .then(() => this.cs.remove(this.COOKIE_KEY))
    }
  }

  refreshEmailCredentials(paswword: string) {
    return this.fbAuth.authState
      .map(user => {
        return user && {
          user,
          credentials: firebase.auth.EmailAuthProvider.credential(user.email as string, paswword)
        }
      })
  }

  updateEmailPassword(currentPassword: string, newPassword: string) {
    return this.refreshEmailCredentials(currentPassword)
      .flatMap((userObj: {
        user: User,
        credentials: firebase.auth.AuthCredential
      }) => userObj.user.reauthenticateWithCredential(userObj.credentials), (userObj: {
        user: firebase.User,
        credentials: firebase.auth.AuthCredential
      }, res) => userObj.user)
      .flatMap(user => user.updatePassword(newPassword))
  }

  updateProfile(displayName?: string, photoURL?: string) {
    return this.fbAuth.authState
      .flatMap(user => {
        return user
          ? user.updateProfile({
            // tslint:disable:no-null-keyword
            displayName: displayName || null,
            photoURL: photoURL || null
          })
          : Observable.throw('missing user')
      }, (user, e) => user)
      .flatMap(user => user ? user.getIdToken(true) : of(undefined))
      .flatMap(() => this.fbAuth.idToken)
  }
}
