import { HttpClient, HttpRequest } from '@angular/common/http'
import { HttpStateTransferInterceptor } from './transfer-http-interceptor.service'
import { TransferHttpModule } from './transfer-http.module'
import { async, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { makeStateKey, TransferState } from '@angular/platform-browser'
import '../../../operators'

describe(HttpStateTransferInterceptor.name, () => {
  let interceptor: HttpStateTransferInterceptor
  let transferState: TransferState
  let httpMock: HttpTestingController
  let http: HttpClient

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransferHttpModule, HttpClientTestingModule],
      providers: [
        HttpStateTransferInterceptor,
        TransferState
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    interceptor = TestBed.get(HttpStateTransferInterceptor)
    transferState = TestBed.get(TransferState)
    httpMock = TestBed.get(HttpTestingController)
    http = TestBed.get(HttpClient)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should construct', async(() => {
    expect(interceptor).toBeDefined()
  }))

  it('should create cache key', async(() => {
    expect.assertions(2)
    const reqGet = new HttpRequest('GET', 'https://somesite.com', {})
    expect(interceptor.createCacheKey(reqGet)).toEqual('https://somesite.com_GET')
    const reqPost = new HttpRequest('POST', 'https://somesite.com', {})
    expect(interceptor.createCacheKey(reqPost)).toEqual('https://somesite.com_POST')
  }))

  it('should fetch request if not previoulsy cached and cache result', async(() => {
    expect.assertions(3)
    http.get('http://www.google.com/api/thing/1').take(1).subscribe(res => expect(res).toEqual({ hello: 'world' }))
    const req = httpMock.expectOne(r => r.url === 'http://www.google.com/api/thing/1')
    expect(req.request.method).toEqual('GET')
    req.flush({ hello: 'world' })
    httpMock.verify()
    const cachedVal = transferState.get(makeStateKey<any>('http://www.google.com/api/thing/1_GET'), {})
    expect((cachedVal as any).body).toEqual({ hello: 'world' })
  }))

  it('should retrieve cached HttpResponse instead of firing an http request', async(() => {
    const tk = makeStateKey<any>('http://www.google.com/api/thing/1_GET')
    transferState.set(tk, { hello: 'world' })
    http.get('http://www.google.com/api/thing/1').subscribe()
    httpMock.expectNone(r => r.url === 'http://www.google.com/api/thing/1')
    httpMock.verify()
  }))

  it('should retrieve cached HttpErrorResponse instead of firing an http request that will error in client', async(() => {
    const tk = makeStateKey<any>('http://www.google.com/api/thing/1_GET')
    transferState.set(tk, { status: 500, payload: { error: 'an error message' } })
    expect(() => http.get('http://www.google.com/api/thing/1').subscribe()).toThrow()
    httpMock.expectNone(r => r.url === 'http://www.google.com/api/thing/1')
    httpMock.verify()
  }))
})
