import { HttpClient, HttpRequest } from '@angular/common/http'
import { ITransferState, TransferState } from './../transfer-state/transfer-state'
import { HttpStateTransferInterceptor } from './transfer-http-interceptor.service'
import { TransferHttpModule } from './transfer-http.module'
import { async, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import '../../../operators'

describe(HttpStateTransferInterceptor.name, () => {
  let interceptor: HttpStateTransferInterceptor
  let transferState: IMockTransferState
  let httpMock: HttpTestingController
  let http: HttpClient

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransferHttpModule, HttpClientTestingModule],
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
    http = TestBed.get(HttpClient)
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

  it('should fetch request if not previoulsy cached and cache result', async(() => {
    transferState.store = {}
    http.get('http://www.google.com/api/thing/1').take(1).subscribe(res => expect(res).toEqual({ hello: 'world' }))
    const req = httpMock.expectOne(r => r.url === 'http://www.google.com/api/thing/1')
    expect(req.request.method).toEqual('GET')
    req.flush({ hello: 'world' })
    httpMock.verify()
    expect(transferState.store).toMatchObject({
      'http://www.google.com/api/thing/1_GET': { body: { hello: 'world' }, status: 200, statusText: 'OK' }
    })
  }))

  it('should retrieve cached HttpResponse instead of firing an http request', async(() => {
    const payload = { items: ['some value'] }
    transferState.store = { 'http://www.google.com/api/thing/1_GET': { status: 200, payload } }
    http.get('http://www.google.com/api/thing/1').subscribe()
    httpMock.expectNone(r => r.url === 'http://www.google.com/api/thing/1')
    httpMock.verify()
  }))

  it('should retrieve cached HttpErrorResponse instead of firing an http request that will error in client', async(() => {
    const payload = { error: 'an error message' }
    transferState.store = { 'http://www.google.com/api/thing/1_GET': { status: 500, payload } }
    expect(() => http.get('http://www.google.com/api/thing/1').subscribe()).toThrow()
    httpMock.expectNone(r => r.url === 'http://www.google.com/api/thing/1')
    httpMock.verify()
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
    this.store[key] = value
    return this.store[key]
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
