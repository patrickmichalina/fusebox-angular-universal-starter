import { RouterTestingModule } from '@angular/router/testing';
import { PlatformService } from './platform.service';
import { GlobalErrorHandler } from './error-handler.service';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoggingService } from './logging.service';
import * as StackTrace from 'stacktrace-js';

describe(GlobalErrorHandler.name, () => {
  let service: GlobalErrorHandler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        GlobalErrorHandler,
        PlatformService,
        { provide: LoggingService, useValue: new MockLoggingService() }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    service = TestBed.get(GlobalErrorHandler);
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should construct', async(() => {
    expect(service).toBeDefined();
  }));

  it('should log an error', fakeAsync(() => {
    const spy = jest.spyOn(TestBed.get(LoggingService), 'error');
    service.handleError(new Error('Testing this error'));
    tick();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should log an error with message, url, and stack trace', fakeAsync(() => {
    const spy = jest.spyOn(TestBed.get(LoggingService), 'error');
    const error = new Error('Testing this error');
    service.handleError(error);
    tick();
    StackTrace.fromError(error).then(stackframes => {
      const stack = stackframes
        .splice(0, 20)
        .map(sf => sf.toString())
        .join('\n');
        expect(spy).toBeCalledWith({ message: 'Testing this error', url: '', stack });
    });
  }));
});

class MockLoggingService {
  error(...msg: any[]) {
    return msg;
  }
}
