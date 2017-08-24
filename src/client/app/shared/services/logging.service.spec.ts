import { PlatformService } from './platform.service';
import { ILoggingService, LoggingService } from './logging.service';
import { async, TestBed } from '@angular/core/testing';

describe(LoggingService.name, () => {
  let service: ILoggingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggingService,
        PlatformService
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    service = TestBed.get(LoggingService);
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should construct', async(() => {
    expect(service).toBeDefined();
  }));
});
