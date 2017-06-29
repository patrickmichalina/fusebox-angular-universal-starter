import { IPlatformService, PlatformService } from './platform.service';
import { TestBed, async } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

describe(PlatformService.name, () => {

  it('should construct', async(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    const service = TestBed.get(PlatformService) as IPlatformService;
    expect(service).not.toBeNull();
  }));

  it('should be browser', async(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    const service = TestBed.get(PlatformService) as IPlatformService;
    expect(service.isBrowser).toBeTruthy();
    expect(service.isServer).toBeFalsy();
  }));

  it('should be server', async(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformService,
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });
    const service = TestBed.get(PlatformService) as IPlatformService;
    expect(service.isServer).toBeTruthy();
    expect(service.isBrowser).toBeFalsy();
  }));
});