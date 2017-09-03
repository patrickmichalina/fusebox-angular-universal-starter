import { IUserIdentity } from './auth.service'
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { CookieService } from './cookie.service'
import { Observable } from 'rxjs/Observable'

export interface IUserIdentity {
  id: string
  username: string
  claims: any
  roles: Set<string>
  isAdmin(): boolean
  isInRole(role: string): boolean
}

export interface ITokenSchema {
  id: string
  username: string
  roles: string
  roleDelimeter: string
  adminRoleNames: string[]
}

export interface IAuthServiceConfig {
  authTokenStorageKey: string
  authTokenPayloadKey: string
  tokenSchema: ITokenSchema
  cookieDomain: string
  useSecureCookies: boolean
  userFactory(token: string, schema: ITokenSchema): IUserIdentity
}

export interface IAuthService {
  userIdentity$: Observable<IUserIdentity | undefined>
  loggedIn$: Observable<boolean>
  isAdmin$: Observable<boolean>
  getTokenFromStore(): string
  authorize(token: string): IUserIdentity | undefined
  authorizeAsync(tokenRequest: Observable<string>): Observable<IUserIdentity | undefined>
  logout(): void
}

export const AUTH_CONFIG = new InjectionToken<IAuthServiceConfig>('app.config.auth')

@Injectable()
export class AuthService implements IAuthService {
  private jwtHelper = new JwtHelper()
  private userIdentitySource = new BehaviorSubject<IUserIdentity | undefined>(this.getUserFromStoredToken())
  public userIdentity$ = this.userIdentitySource.asObservable()
  public loggedIn$ = this.userIdentity$.map(res => res ? true : false)
  public isAdmin$ = this.userIdentity$.map(res => res ? res.isAdmin() ? true : false : false)

  constructor(@Inject(AUTH_CONFIG) private config: IAuthServiceConfig, private cookieService: CookieService) {
    if (!config) throw new Error('Missing config')
    if (!config.tokenSchema) throw new Error('Missing config.tokenSchema')
    if (!config.authTokenStorageKey) throw new Error('Missing config.authTokenStorageKey')
    if (!config.cookieDomain) throw new Error('Missing config.cookieDomain')

    this.cookieService.cookies$.subscribe(cookies => {
      if (this.tokenIsValid(cookies[config.authTokenStorageKey])) {
        this.updateUser(this.jwtHelper.decodeToken(cookies[config.authTokenStorageKey]))
      } else {
        this.updateUser(undefined)
      }
    })
  }

  public getTokenFromStore(): string {
    return this.cookieService.get(this.config.authTokenStorageKey)
  }

  public logout(): void {
    return this.cookieService.remove(this.config.authTokenStorageKey, { domain: this.config.cookieDomain })
  }

  private tokenIsValid(token: string): boolean {
    if (!token) return false
    const tkn = this.jwtHelper.decodeToken(token)
    return tkn && !this.jwtHelper.isTokenExpired(token)
  }

  private updateUser(decodedToken: any): void {
    decodedToken
      ? this.userIdentitySource.next(this.config.userFactory(decodedToken, this.config.tokenSchema))
      : this.userIdentitySource.next(undefined)
  }

  private getUserFromStoredToken(): IUserIdentity | undefined {
    const token = this.getTokenFromStore()
    if (!token) return undefined
    return this.config.userFactory(this.jwtHelper.decodeToken(token), this.config.tokenSchema)
  }

  private setToken(rawToken: string, domain: string): IUserIdentity | undefined {
    if (!rawToken) return undefined
    this.cookieService.set(this.config.authTokenStorageKey, rawToken, {
      secure: this.config.useSecureCookies,
      domain,
      expires: this.jwtHelper.getTokenExpirationDate(rawToken)
    })
    return this.getUserFromStoredToken()
  }

  public authorizeAsync(tokenRequest: Observable<string>): Observable<IUserIdentity | undefined> {
    return tokenRequest.flatMap(token => {
      return Observable.of(this.setToken(token, this.config.cookieDomain))
    })
  }

  public authorize(token: string): IUserIdentity | undefined {
    return this.setToken(token, this.config.cookieDomain)
  }
}
