import { CookieService, ICookieService } from './cookie.service'
import { AUTH_CONFIG, AuthService, IAuthService, IAuthServiceConfig, ITokenSchema, IUserIdentity } from './auth.service'
import { async, TestBed } from '@angular/core/testing'
import { Observable } from 'rxjs/Observable'
import '../../../operators'

export const authConfg: IAuthServiceConfig = {
  authTokenStorageKey: 'auth',
  cookieDomain: 'localhost',
  useSecureCookies: false,
  tokenSchema: {
    id: 'user_id',
    name: 'name',
    email: 'email',
    email_verified: 'email_verified',
    roles: 'roles',
    roleDelimeter: ',',
    picture: 'picture',
    adminRoleNames: ['ROLE_ADMIN']
  },
  userFactory: (tokenJson: any, schema: ITokenSchema): IUserIdentity => {

    if (!tokenJson) throw new Error('')
    if (!schema) throw new Error('')

    const roles = tokenJson[schema.roles] as string[] || []
    const roleSet = new Set<string>()

    Array.isArray(roles)
      ? roles.forEach(role => roleSet.add(role))
      : roleSet.add(roles)

    const user: IUserIdentity = {
      claims: tokenJson,
      id: tokenJson[schema.id] as string,
      name: tokenJson[schema.name] as string,
      email: tokenJson[schema.email] as string,
      email_verified: tokenJson[schema.email_verified] as boolean,
      picture: tokenJson[schema.picture] as string,
      roles: roleSet,
      isInRole(name: string) {
        return roleSet.has(name)
      },
      isAdmin() {
        return schema.adminRoleNames.some(role => roleSet.has(role))
      }
    }

    return user
  }
}

class MockCookieService implements ICookieService {
  public mockCookieStore: any = {}

  get(name: string): any {
    return this.mockCookieStore[name]
  }

  getAll() {
    throw new Error('Method not implemented.')
  }
  set(name: string, value: any, options?: Cookies.CookieAttributes | undefined): void {
    throw new Error('Method not implemented.')
  }
  remove(name: string, options?: Cookies.CookieAttributes | undefined): void {
    delete this.mockCookieStore[name]
  }

  get cookies$(): Observable<{ [key: string]: any; }> {
    return Observable.create((observer: any) => {
      observer.next(this.mockCookieStore)
      observer.complete()
    })
  }
}

describe(AuthService.name, () => {
  let service: IAuthService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: new MockCookieService() },
        { provide: AUTH_CONFIG, useValue: authConfg }
      ]
    })
  }))

  beforeEach(() => {
    service = TestBed.get(AuthService)
  })

  it('should construct', async(() => {
    expect(service).toBeDefined()
  }))

  it('should throw if missing IAuthServiceConfig', async(() => {
    expect.assertions(1)
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AUTH_CONFIG, useValue: undefined }
      ]
    }).compileComponents()
    expect(() => TestBed.get(AuthService)).toThrow()
  }))

  it('should throw if missing tokenSchema', async(() => {
    expect.assertions(1)
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: new MockCookieService() },
        { provide: AUTH_CONFIG, useValue: { tokenSchema: undefined } }
      ]
    }).compileComponents()
    expect(() => TestBed.get(AuthService)).toThrow('Missing config.tokenSchema')
  }))

  it('should throw if missing authTokenStorageKey', async(() => {
    expect.assertions(1)
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: new MockCookieService() },
        { provide: AUTH_CONFIG, useValue: { tokenSchema: {}, authTokenStorageKey: undefined } }
      ]
    }).compileComponents()
    expect(() => TestBed.get(AuthService)).toThrow('Missing config.authTokenStorageKey')
  }))

  it('should throw if missing config.cookieDomain', async(() => {
    expect.assertions(1)
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: new MockCookieService() },
        { provide: AUTH_CONFIG, useValue: { tokenSchema: {}, authTokenStorageKey: {}, cookieDomain: undefined } }
      ]
    }).compileComponents()
    expect(() => TestBed.get(AuthService)).toThrow('Missing config.cookieDomain')
  }))

  it('should get token from store using config.authTokenStorageKey', async(() => {
    expect.assertions(1)
    const injectedConfig = TestBed.get(AUTH_CONFIG) as IAuthServiceConfig
    TestBed.get(CookieService).mockCookieStore[injectedConfig.authTokenStorageKey] = 'test_token_value'
    expect(service.getTokenFromStore()).toBe('test_token_value')
  }))

  it('should remove token from store on logout', async(() => {
    expect.assertions(2)
    const injectedConfig = TestBed.get(AUTH_CONFIG) as IAuthServiceConfig
    TestBed.get(CookieService).mockCookieStore[injectedConfig.authTokenStorageKey] = 'test_token_value'
    expect(service.getTokenFromStore()).toBe('test_token_value')
    service.logout()
    expect(service.getTokenFromStore()).toBeUndefined()
  }))
})
