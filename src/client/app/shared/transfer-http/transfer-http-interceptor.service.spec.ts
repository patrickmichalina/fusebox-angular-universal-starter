import { HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { ITransferState, TransferState } from './../transfer-state/transfer-state'
import { HttpStateTransferInterceptor } from './transfer-http-interceptor.service'
import { async, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import '../../../operators'

describe(HttpStateTransferInterceptor.name, () => {
  let interceptor: HttpStateTransferInterceptor
  let transferState: IMockTransferState
  let httpMock: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpStateTransferInterceptor,
        { provide: TransferState, useValue: new MockTransferState() }
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    interceptor = TestBed.get(HttpStateTransferInterceptor)
    transferState = TestBed.get(TransferState)
    httpMock = TestBed.get(HttpTestingController)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should construct', async(() => {
    expect(interceptor).toBeDefined()
  }))

  it('should create cache key', async(() => {
    const reqGet = new HttpRequest('GET', 'https://somesite.com', {})
    expect(interceptor.createCacheKey(reqGet)).toEqual('https://somesite.com_GET')
    const reqPost = new HttpRequest('POST', 'https://somesite.com', {})
    expect(interceptor.createCacheKey(reqPost)).toEqual('https://somesite.com_POST')
  }))

  it('should retrieve cached HttpResponse instead of firing an http request', async(() => {
    const req = new HttpRequest('GET', 'https://somesite.com')
    const handler = TestBed.get(HttpHandler) as HttpHandler
    const payload = { items: ['some value'] }
    transferState.store = { 'https://somesite.com_GET': { status: 200, body: payload } }

    interceptor.intercept(req, handler).subscribe((next: HttpResponse<any>) => {
      expect(next).toBeInstanceOf(HttpResponse)
      expect(next.status).toEqual(200)
      expect(next.body).toEqual(payload)
    })
  }))

  it('should retrieve cached HttpErrorResponse instead of firing an http request that will error in client', async(() => {
    const req = new HttpRequest('GET', 'https://somesite.com')
    const handler = TestBed.get(HttpHandler) as HttpHandler
    const cachedError = { status: 500, error: 'some error' }
    transferState.store = { 'https://somesite.com_GET': cachedError }

    interceptor.intercept(req, handler).subscribe(res => undefined, (err: HttpErrorResponse) => {
      expect(err).toBeInstanceOf(HttpErrorResponse)
      expect(err.status).toEqual(500)
      expect(err.error).toEqual(cachedError.error)
    })
  }))
})

interface IMockTransferState extends ITransferState {
  store: { [key: string]: any }
}

class MockTransferState implements IMockTransferState {
  constructor(public store: { [key: string]: any } = {}) { }

  get(key: string) {
    return this.store[key]
  }
  keys(): IterableIterator<string> {
    throw new Error('Method not implemented.')
  }
  set(key: string, value: any): Map<string, any> {
    throw new Error('Method not implemented.')
  }
  toJson() {
    throw new Error('Method not implemented.')
  }
  initialize(obj: { [key: string]: any; }): Map<string, any> {
    throw new Error('Method not implemented.')
  }
  bust(): Map<string, any> {
    throw new Error('Method not implemented.')
  }
  bustByKey(key: string): Map<string, any> {
    throw new Error('Method not implemented.')
  }
  bustByKeyPattern(pattern: RegExp): Map<string, any> {
    throw new Error('Method not implemented.')
  }
}
