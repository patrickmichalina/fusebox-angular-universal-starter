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
      })
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

    it('should call external logging library', async(() => {
      const traceSpy = jest.spyOn((service as any).logger, 'trace')
      const debugSpy = jest.spyOn((service as any).logger, 'debug')
      const infoSpy = jest.spyOn((service as any).logger, 'info')
      const warnSpy = jest.spyOn((service as any).logger, 'warn')
      const errorSpy = jest.spyOn((service as any).logger, 'error')
      service.trace('')
      service.debug('')
      service.info('')
      service.warn('')
      service.error('')
      expect(traceSpy).toHaveBeenCalled()
      expect(debugSpy).toHaveBeenCalled()
      expect(infoSpy).toHaveBeenCalled()
      expect(warnSpy).toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalled()
    }))
  })
})
