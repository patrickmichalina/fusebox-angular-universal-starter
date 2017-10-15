import { CACHE_TAG_CONFIG, CACHE_TAG_FACTORY, CacheTagConfig } from './http-cache-tag.module'
import { RESPONSE } from '@nguniversal/express-engine/tokens'
import { ENV_CONFIG } from './../../app.config'
import { HttpCacheTagInterceptor } from './http-cache-tag-interceptor.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { async, TestBed } from '@angular/core/testing'
import { Response } from 'express'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders, HttpInterceptor, HttpResponse } from '@angular/common/http'
import { ServerResponseService } from '../services/server-response.service'
import '../../../operators'

// for testing purposes
export class ExpressResponse {
  store = new Map()
  getHeader(key: string) {
    return this.store.get(key)
  }

  header(key: string, value: string) {
    this.store.set(key, value)
  }
}

describe(HttpCacheTagInterceptor.name, () => {
  let interceptor: HttpInterceptor
  let http: HttpClient
  let httpMock: HttpTestingController
  let serverResponse: Response
  let config: CacheTagConfig

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: HttpCacheTagInterceptor, useClass: HttpCacheTagInterceptor, deps: [CACHE_TAG_CONFIG, CACHE_TAG_FACTORY] },
        { provide: HTTP_INTERCEPTORS, useExisting: HttpCacheTagInterceptor, multi: true },
        { provide: RESPONSE, useClass: ExpressResponse },
        {
          provide: ENV_CONFIG,
          useValue: {
            endpoints: {
              discovery: 'http://some.endpoint/api'
            }
          }
        },
        {
          provide: CACHE_TAG_CONFIG,
          useValue: {
            headerKey: 'Cache-Tag',
            cacheableResponseCodes: [200, 201]
          }
        },
        ServerResponseService,
        {
          provide: CACHE_TAG_FACTORY,
          useFactory: (srs: ServerResponseService) => {
            return (httpResponse: HttpResponse<any>, d: CacheTagConfig) => {
              const cacheHeader = httpResponse.headers.get(config.headerKey)
              if (cacheHeader) {
                srs.appendHeader(config.headerKey, cacheHeader)
              }
            }
          },
          deps: [ServerResponseService]
        }
      ]
    })
  }))

  beforeEach(() => {
    interceptor = TestBed.get(HttpCacheTagInterceptor)
    http = TestBed.get(HttpClient)
    httpMock = TestBed.get(HttpTestingController)
    serverResponse = TestBed.get(RESPONSE)
    config = TestBed.get(CACHE_TAG_CONFIG)
  })

  afterEach(() => {
    TestBed.resetTestingModule()
  })

  it('should construct', async(() => {
    expect(interceptor).toBeDefined()
  }))

  it('should append cache headers to server response', async(() => {
    expect.assertions(4)
    http.get('http://www.google.com/api/some-thing/123', { observe: 'response' }).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.headers.get(config.headerKey)).toEqual('Thing-123')
      expect(serverResponse.getHeader(config.headerKey)).toEqual('Thing-123')
    })

    const req1 = httpMock.expectOne(r => r.url === 'http://www.google.com/api/some-thing/123')
    expect(req1.request.method).toEqual('GET')

    req1.flush({ hello: 'world' }, {
      headers: new HttpHeaders().set(config.headerKey, 'Thing-123')
    })

    httpMock.verify()
  }))

  it('should append cache headers to server response with other status code', async(() => {
    expect.assertions(4)
    http.get('http://www.google.com/api/some-thing/123', { observe: 'response' }).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.headers.get(config.headerKey)).toEqual('Thing-123')
      expect(serverResponse.getHeader(config.headerKey)).toEqual('Thing-123')
    })

    const req1 = httpMock.expectOne(r => r.url === 'http://www.google.com/api/some-thing/123')
    expect(req1.request.method).toEqual('GET')

    req1.flush({ hello: 'world' }, {
      status: 201,
      statusText: 'OK',
      headers: new HttpHeaders().set(config.headerKey, 'Thing-123')
    })

    httpMock.verify()
  }))

  it('should not append cache headers when wrong header exists', async(() => {
    expect.assertions(4)
    http.get('http://www.google.com/api/some-thing/123', { observe: 'response' }).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.headers.get(config.headerKey)).toBeNull()
      expect(serverResponse.getHeader(config.headerKey)).toBeUndefined()
    })

    const req = httpMock.expectOne(r => r.url === 'http://www.google.com/api/some-thing/123')
    expect(req.request.method).toEqual('GET')

    req.flush({ hello: 'world' }, {
      headers: new HttpHeaders().set('Some-Nothing-Tag', 'Thing-123')
    })

    httpMock.verify()
  }))

  it('should not append cache headers when no headers exists', async(() => {
    expect.assertions(4)
    http.get('http://www.google.com/api/some-thing/123', { observe: 'response' }).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.headers.get(config.headerKey)).toBeNull()
      expect(serverResponse.getHeader(config.headerKey)).toBeUndefined()
    })

    const req1 = httpMock.expectOne(r => r.url === 'http://www.google.com/api/some-thing/123')
    expect(req1.request.method).toEqual('GET')

    req1.flush({ hello: 'world' })

    httpMock.verify()
  }))

  it('should only append headers with proper API response status codes', async(() => {
    expect.assertions(4)
    http.get('http://www.google.com/api/some-thing/123', { observe: 'response' }).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.headers.get(config.headerKey)).toBeDefined()
      expect(serverResponse.getHeader(config.headerKey)).toBeUndefined()
    })

    const req = httpMock.expectOne(r => r.url === 'http://www.google.com/api/some-thing/123')
    expect(req.request.method).toEqual('GET')

    req.flush({ hello: 'world' }, {
      status: 206,
      statusText: 'OK',
      headers: new HttpHeaders().set(config.headerKey, 'Thing-123')
    })

    httpMock.verify()
  }))
})
