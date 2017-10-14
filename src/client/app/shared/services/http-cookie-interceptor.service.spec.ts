import { REQUEST } from '@nguniversal/express-engine/tokens'
import { IPlatformService, PlatformService } from './platform.service'
import { ENV_CONFIG } from './../../app.config'
import { COOKIE_HOST_WHITELIST, HttpCookieInterceptor } from './http-cookie-interceptor.service'
import {
  HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpInterceptor, HttpResponse
} from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { async, TestBed } from '@angular/core/testing'
import '../../../operators'

describe(HttpCookieInterceptor.name, () => {
  describe('when on platform server', () => {
    let interceptor: HttpInterceptor
    let http: HttpClient
    let httpMock: HttpTestingController

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, HttpClientModule],
        providers: [
          HttpCookieInterceptor,
          { provide: HTTP_INTERCEPTORS, useClass: HttpCookieInterceptor, multi: true },
          { provide: PlatformService, useValue: new MockPlatformService(false) },
          {
            provide: COOKIE_HOST_WHITELIST,
            useValue: [
              'some-domain.com'
            ]
          },
          {
            provide: REQUEST, useValue: {
              cookies: {
                'jwt_for_some_app': '123'
              }
            }
          }
        ]
      })
    }))

    beforeEach(() => {
      interceptor = TestBed.get(HttpCookieInterceptor)
      http = TestBed.get(HttpClient)
      httpMock = TestBed.get(HttpTestingController)
    })

    afterEach(() => {
      TestBed.resetTestingModule()
    })

    it('should construct', async(() => {
      expect(interceptor).toBeDefined()
    }))

    it('should send request with cookie headers when user is logged in', async(() => {
      expect.assertions(4)

      http.get('http://some-domain.com/article/123', {
        observe: 'response'
      }).subscribe(response => {
        expect(response).toBeInstanceOf(HttpResponse)
      })

      const req = httpMock.expectOne(r => r.url === 'http://some-domain.com/article/123')
      expect(req.request.method).toEqual('GET')
      expect(req.request.withCredentials).toBeTruthy()
      expect(req.request.headers.get('Cookie')).toEqual('jwt_for_some_app=123;')

      req.flush({})
      httpMock.verify()
    }))

    it('should not send request with cookie headers when request is from non-whitelisted domain', async(() => {
      expect.assertions(4)

      http.get('http://google.com/article/123', {
        observe: 'response'
      }).subscribe(response => {
        expect(response).toBeInstanceOf(HttpResponse)
      })

      const req = httpMock.expectOne(r => r.url === 'http://google.com/article/123')
      expect(req.request.method).toEqual('GET')
      expect(req.request.withCredentials).toBeFalsy()
      expect(req.request.headers.get('Cookie')).toBeNull()

      req.flush({})
      httpMock.verify()
    }))

    it('should return original request if no auth data is found', async(() => {
      expect.assertions(3)

      http.get('http://google.com/article/123', {
        observe: 'response'
      }).subscribe(response => {
        expect(response).toBeInstanceOf(HttpResponse)
      })

      const req = httpMock.expectOne(r => r.url === 'http://google.com/article/123')
      expect(req.request.method).toEqual('GET')
      expect(req.request.headers.get('Authorization')).toBeFalsy()

      req.flush({})
      httpMock.verify()
    }))

  })
  describe('when on platform browser', () => {
    let interceptor: HttpInterceptor
    let http: HttpClient
    let httpMock: HttpTestingController

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, HttpClientModule],
        providers: [
          HttpCookieInterceptor,
          { provide: HTTP_INTERCEPTORS, useClass: HttpCookieInterceptor, multi: true },
          { provide: PlatformService, useValue: new MockPlatformService(false) },
          { provide: REQUEST, useValue: {} },
          {
            provide: COOKIE_HOST_WHITELIST,
            useValue: [
              'some-domain.com'
            ]
          },
          {
            provide: ENV_CONFIG,
            useValue: {
              endpoints: {
                discovery: 'http://some.endpoint/api'
              }
            }
          }
        ]
      }).compileComponents()
    }))

    beforeEach(() => {
      interceptor = TestBed.get(HttpCookieInterceptor)
      http = TestBed.get(HttpClient)
      httpMock = TestBed.get(HttpTestingController)
    })

    afterEach(() => {
      TestBed.resetTestingModule()
    })

    it('should construct', async(() => {
      expect(interceptor).toBeDefined()
    }))

    it('should clone request with credentials set to true', async(() => {
      expect.assertions(2)
      http.get('http://google.com/article/123', {
        observe: 'response'
      }).subscribe(response => {
        expect(response).toBeInstanceOf(HttpResponse)
      })

      const req = httpMock.expectOne(r => r.url === 'http://google.com/article/123')
      expect(req.request.method).toEqual('GET')
      // TOOD: expect(req.request.withCredentials).toBeTruthy()

      req.flush({ data: {} })
      httpMock.verify()
    }))
  })

})

class MockPlatformService implements IPlatformService {
  isServer: boolean = !this.isServer
  constructor(public isBrowser = true) { }
}
