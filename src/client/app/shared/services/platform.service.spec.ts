import { IPlatformService, PlatformService } from './platform.service';
import { TestBed, async } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

describe(PlatformService.name, () => {
  let service: IPlatformService;

  describe('browser', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      service = TestBed.get(PlatformService);
    });

    it('should construct', async(() => {
      expect(service).not.toBeNull();
    }));

    it('should be browser', async(() => {
      expect(service.isBrowser).toBeTruthy();
      expect(service.isServer).toBeFalsy();
    }));
  });

  describe('server', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      service = TestBed.get(PlatformService);
    });

    it('should be server', async(() => {
      expect(service.isServer).toBeTruthy();
      expect(service.isBrowser).toBeFalsy();
    }));
  });
});