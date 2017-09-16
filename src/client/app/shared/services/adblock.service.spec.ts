import { IPlatformService, PlatformService } from './platform.service'
import { AdblockService, IAdblockService } from './adblock.service'
import { async, TestBed } from '@angular/core/testing'
import { BaseRequestOptions, Http } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { Observable } from 'rxjs/Observable'
import '../../../operators'

class MockHttp {
  public returnValue: any
  public throw: any

  get(): Observable<any> {
    return Observable.create((observer: any) => {
      if (this.throw) observer.throw(this.throw)
      observer.next(this.returnValue)
      observer.complete()
    })
  }
}

describe(AdblockService.name, () => {
  let service: IAdblockService
  let mockHttp: MockHttp

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        { provide: Http, useValue: new MockHttp() },
        { provide: PlatformService, useValue: new MockPlatformService() },
        AdblockService
      ]
    })
  }))

  beforeEach(() => {
    service = TestBed.get(AdblockService)
    mockHttp = TestBed.get(Http)
  })

  it('should construct', async(() => {
    expect(service).toBeTruthy()
  }))

  it('should return an observable when called', async(() => {
    expect(service.adBlockerIsActive$).toEqual(expect.any(Observable))
  }))

  it('should detect adblock is present', async(() => {
    mockHttp.throw = { status: 0 }
    service.adBlockerIsActive$.subscribe(result => expect(result).toBe(true))
  }))

  it('should detect adblock is not present', async(() => {
    mockHttp.returnValue = { status: 200 }
    service.adBlockerIsActive$.subscribe(result => expect(result).toBe(false))
  }))

  it('should return false when not on platform browser', async(() => {
    const ps = TestBed.get(PlatformService) as MockPlatformService
    ps.isServer = true
    service.adBlockerIsActive$.subscribe(result => expect(result).toBe(false))
  }))
})

class MockPlatformService implements IPlatformService {
  public isBrowser = true
  public isServer= false
}
