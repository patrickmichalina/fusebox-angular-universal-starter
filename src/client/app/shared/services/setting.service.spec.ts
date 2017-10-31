import { HttpClientTestingModule } from '@angular/common/http/testing'
import { IPlatformService, PlatformService } from './platform.service'
import { SettingService } from './setting.service'
import { async, TestBed } from '@angular/core/testing'
import { FirebaseDatabaseService } from './firebase-database.service'
import { of } from 'rxjs/observable/of'
import '../../../operators'

describe(SettingService.name, () => {
  let service: SettingService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SettingService,
        { provide: PlatformService, useValue: new MockPlatformService() },
        { provide: FirebaseDatabaseService, useValue: new MockDb() }
      ]
    })
  }))

  beforeEach(() => {
    service = TestBed.get(SettingService)
  })

  it('should construct', async(() => {
    expect(service).toBeTruthy()
  }))
})

class MockPlatformService implements IPlatformService {
  public isBrowser = true
  public isServer= false
}

class MockDb {
  get() {
    return of('test')
  }
}
