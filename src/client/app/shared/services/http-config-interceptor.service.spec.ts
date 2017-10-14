import { EnvironmentService, IEnvironmentService } from './environment.service'
import { HttpConfigInterceptor } from './http-config-interceptor.service'
import {
  HTTP_INTERCEPTORS,
  HttpClient, HttpClientModule,
  HttpInterceptor
} from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { async, TestBed } from '@angular/core/testing'
import '../../../operators'

describe(HttpConfigInterceptor.name, () => {
  let interceptor: HttpInterceptor
  let http: HttpClient
  let httpMock: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        HttpConfigInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        { provide: EnvironmentService, useValue: new MockEnvironmentService() }
      ]
    })
  }))

  beforeEach(() => {
    interceptor = TestBed.get(HttpConfigInterceptor)
    http = TestBed.get(HttpClient)
    httpMock = TestBed.get(HttpTestingController)
  })

  afterEach(() => {
    TestBed.resetTestingModule()
  })

  it('should construct', async(() => {
    expect(interceptor).toBeDefined()
  }))

  it('should passthrough absolute url requests', async(() => {
    expect.assertions(2)
    http.get('http://www.google.com/api/some-thing').subscribe(response => expect(response).toBeTruthy())

    const req = httpMock.expectOne(r => r.url === 'http://www.google.com/api/some-thing')
    expect(req.request.method).toEqual('GET')

    req.flush({ hello: 'world' })
    httpMock.verify()
  }))

  it('should make relative urls universal friendly', async(() => {
    expect.assertions(2)
    http.get('./changelog.md').take(1).subscribe(response => expect(response).toBeTruthy())

    const req = httpMock.expectOne(r => r.url === 'http://my-awesome-website.com/changelog.md')
    expect(req.request.method).toEqual('GET')

    req.flush({})

    httpMock.verify()
  }))

  it('should handle entity reqests', async(() => {
    expect.assertions(2)
    http.get('note/123').take(1).subscribe(response => expect(response).toBeTruthy())

    const req = httpMock.expectOne(r => r.url === 'http://my.api.com/note/123')
    expect(req.request.method).toEqual('GET')

    req.flush({})

    httpMock.verify()
  }))

  it('should throw an exception when no config is present', async(() => {
    const env = TestBed.get(EnvironmentService)
    env.value = {}
    expect.assertions(1)
    expect(() => http.get('./changelog.md').take(1).subscribe(response => expect(response).toBeTruthy()))
      .toThrow('missing endpoint configuration value')
  }))

  it('should throw an exception when no host value is present', async(() => {
    const env = TestBed.get(EnvironmentService)
    env.value = {
      endpoints: {
        api: 'http://my.api.com'
      }
    }
    expect.assertions(1)
    expect(() => http.get('./changelog.md').take(1).subscribe(response => expect(response).toBeTruthy()))
      .toThrow('missing host configuration value')
  }))

})

class MockEnvironmentService implements IEnvironmentService {
  get config() {
    return this.value || {
      endpoints: {
        api: 'http://my.api.com'
      },
      host: 'http://my-awesome-website.com'
    }
  }
  constructor(public value?: any) { }
}
