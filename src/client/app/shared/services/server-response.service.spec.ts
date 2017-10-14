import { IServerResponseService, ServerResponseService } from './server-response.service'
import { async, TestBed } from '@angular/core/testing'
import { RESPONSE } from '@nguniversal/express-engine/tokens'

describe(ServerResponseService.name, () => {
  let service: IServerResponseService
  let _RESPONSE: MockResponse

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerResponseService,
        { provide: RESPONSE, useValue: new MockResponse() }
      ]
    })
  }))

  beforeEach(() => {
    service = TestBed.get(ServerResponseService)
    _RESPONSE = TestBed.get(RESPONSE)
  })

  it('should construct', async(() => {
    expect(service).toBeTruthy()
  }))

  it('should set header', async(() => {
    service.setHeader('test', 'awesome value')
    expect(service.getHeader('test')).toBe('awesome value')
  }))

  it('should set multiple headers', async(() => {
    service.setHeaders({ thing: '1', thingy: '3'})
    expect(service.getHeader('thing')).toBe('1')
    expect(service.getHeader('thingy')).toBe('3')
  }))

  it('should append headers', async(() => {
    expect.assertions(2)
    service.setHeader('test', 'awesome value')
    expect(service.getHeader('test')).toBe('awesome value')
    service.appendHeader('test', 'another awesome value')
    expect(service.getHeader('test')).toBe('awesome value,another awesome value')
  }))

  it('should append headers safely with undefined initial value', async(() => {
    service.appendHeader('test', 'awesome value')
    expect(service.getHeader('test')).toBe('awesome value')
  }))

  it('should append headers without duplicates values', async(() => {
    expect.assertions(1)
    service.appendHeader('test', 'awesome value')
    service.appendHeader('test', 'awesome value')
    service.appendHeader('test', 'awesome value')
    expect(service.getHeader('test')).toBe('awesome value')
  }))

  it('should append headers using custom delimiter', async(() => {
    expect.assertions(2)
    service.setHeader('test', 'awesome value')
    expect(service.getHeader('test')).toBe('awesome value')
    service.appendHeader('test', 'another awesome value', '-')
    expect(service.getHeader('test')).toBe('awesome value-another awesome value')
  }))

  it('should set standard not-found response', async(() => {
    expect.assertions(1)
    _RESPONSE.statusCode = 0
    service.setNotFound()
    expect(_RESPONSE.statusCode).toEqual(404)
  }))

  it('should set standard error response', async(() => {
    expect.assertions(2)
    _RESPONSE.statusCode = 0
    service.setError()
    expect(_RESPONSE.statusCode).toEqual(500)
    expect(_RESPONSE.statusMessage).toEqual('internal server error')
  }))

  it('should set status', async(() => {
    expect.assertions(2)
    _RESPONSE.statusCode = 0
    _RESPONSE.statusMessage = ''
    service.setStatus(304, 'cool')
    expect(_RESPONSE.statusCode).toEqual(304)
    expect(_RESPONSE.statusMessage).toEqual('cool')
  }))
})

class MockResponse {
  store: any = {}
  statusCode: number
  statusMessage: string

  header(key: string, value: string) {
    this.store[key] = value
  }

  getHeader(key: string) {
    return this.store[key]
  }
}
