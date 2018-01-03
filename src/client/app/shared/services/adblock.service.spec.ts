import { IPlatformService, PlatformService } from './platform.service'
import { AdblockService, IAdblockService } from './adblock.service'
import { async, TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import '../../../operators'

describe(AdblockService.name, () => {
  let service: IAdblockService
  let httpMock: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        AdblockService,
        { provide: PlatformService, useValue: new MockPlatformService() }
      ]
    })
  }))

  beforeEach(() => {
    service = TestBed.get(AdblockService)
    httpMock = TestBed.get(HttpTestingController)
  })

  it('should detect adblock is present', async(() => {
    service.adBlockerIsActive$.subscribe(isPresent => {
      expect(isPresent).toBeTruthy()
    })

    const req = httpMock.expectOne(r => r.url === './ad-server.js')
    expect(req.request.method).toEqual('GET')

    req.flush('', { status: 404, statusText: 'not found'})
    httpMock.verify()
  }))

  it('should detect adblock is not present', async(() => {
    service.adBlockerIsActive$.subscribe(isPresent => {
      expect(isPresent).toBeFalsy()
    })

    const req = httpMock.expectOne(r => r.url === './ad-server.js')
    expect(req.request.method).toEqual('GET')

    req.flush('', { status: 200, statusText: 'not found'})
    httpMock.verify()
  }))

  it('should return false when not on platform browser', async(() => {
    const ps = TestBed.get(PlatformService) as MockPlatformService
    ps.isServer = true
    service.adBlockerIsActive$.subscribe(result => expect(result).toBe(false))
  }))
})

class MockPlatformService implements IPlatformService {
  public isBrowser = true
  public isServer = false
}
