import { IPlatformService, PlatformService } from './platform.service'
import { async, TestBed } from '@angular/core/testing'
import { PLATFORM_ID } from '@angular/core'

describe(PlatformService.name, () => {
  let service: IPlatformService

  describe(`${PlatformService.name}.browser`, () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      }).compileComponents()
    }))

    beforeEach(async(() => {
      service = TestBed.get(PlatformService)
    }))

    afterEach(async(() => {
      TestBed.resetTestingModule()
    }))

    it('should construct', async(() => {
      expect(service).not.toBeNull()
    }))

    it('should be browser', async(() => {
      expect(service.isBrowser).toEqual(true)
      expect(service.isServer).toEqual(false)
    }))
  })

  describe(`${PlatformService.name}.server`, () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      }).compileComponents()
    }))

    beforeEach(async(() => {
      service = TestBed.get(PlatformService)
    }))

    afterEach(async(() => {
      TestBed.resetTestingModule()
    }))

    it('should be server', async(() => {
      expect(service.isServer).toEqual(true)
      expect(service.isBrowser).toEqual(false)
    }))
  })
})
