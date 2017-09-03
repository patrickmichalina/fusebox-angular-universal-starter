import { PlatformService } from './platform.service'
import { ILoggingService, LOGGER_CONFIG, LoggingService } from './logging.service'
import { async, TestBed } from '@angular/core/testing'
import { PLATFORM_ID } from '@angular/core'

describe(LoggingService.name, () => {
  describe('browser', () => {
    let service: ILoggingService
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          LoggingService,
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'browser' },
          {
            provide: LOGGER_CONFIG,
            useValue: {
              name: 'Angular Universal App',
              type: 'app'
            }
          }
        ]
      }).compileComponents()
    }))

    beforeEach(async(() => {
      service = TestBed.get(LoggingService)
    }))

    afterEach(async(() => {
      TestBed.resetTestingModule()
    }))

    it('should construct', async(() => {
      expect(service).toBeDefined()
    }))
  })
})
