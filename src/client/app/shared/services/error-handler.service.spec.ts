import { RouterTestingModule } from '@angular/router/testing'
import { PlatformService } from './platform.service'
import { GlobalErrorHandler } from './error-handler.service'
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ILoggingService, LOGGER_CONFIG, LoggingService } from './logging.service'
import { EnvironmentService, IEnvironmentService } from './environment.service'
import { TESTING_CONFIG } from '../../app.component.spec'
import * as StackTrace from 'stacktrace-js'

describe(GlobalErrorHandler.name, () => {
  let service: GlobalErrorHandler

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        GlobalErrorHandler,
        PlatformService,
        { provide: LoggingService, useValue: new MockLoggingService() },
        { provide: EnvironmentService, useValue: new MockEnvironmentService() },
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
    service = TestBed.get(GlobalErrorHandler)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should construct', async(() => {
    expect(service).toBeDefined()
  }))

  it('should log an error', fakeAsync(() => {
    const spy = jest.spyOn(TestBed.get(LoggingService), 'error')
    service.handleError(new Error('Testing this error'))
    tick()
    expect(spy).toHaveBeenCalledTimes(1)
  }))

  it('should log an error with message, url, and stack trace', fakeAsync(() => {
    const spy = jest.spyOn(TestBed.get(LoggingService), 'error')
    const error = new Error('Testing this error')
    service.handleError(error)
    tick()
    StackTrace.fromError(error).then(stackframes => {
      const stack = stackframes
        .splice(0, 20)
        .map(sf => sf.toString())
        .join('\n')
      expect(spy).toBeCalledWith('Testing this error', { url: '', stack }, { config: TESTING_CONFIG })
    })
  }))

  it('should catch bad stack trace parse', fakeAsync(() => {
    const spy = jest.spyOn(TestBed.get(LoggingService), 'error')
    service.handleError({ message: 'Testing this error' })
    tick()
    StackTrace.fromError({} as any).catch(error => {
      expect(spy).toBeCalledWith('Testing this error', { url: '', stack: error }, { config: TESTING_CONFIG })
    })
  }))
})

// tslint:disable:no-empty
class MockLoggingService implements ILoggingService {
  error(msg: string, errObj?: { [key: string]: any; } | undefined, extendedObj?: { [key: string]: any; } | undefined): void { }
  trace(msg: string, errObj?: { [key: string]: any; } | undefined, extendedObj?: { [key: string]: any; } | undefined): void { }
  debug(msg: string, errObj?: { [key: string]: any; } | undefined, extendedObj?: { [key: string]: any; } | undefined): void { }
  info(msg: string, errObj?: { [key: string]: any; } | undefined, extendedObj?: { [key: string]: any; } | undefined): void { }
  warn(msg: string, errObj?: { [key: string]: any; } | undefined, extendedObj?: { [key: string]: any; } | undefined): void { }
}

class MockEnvironmentService implements IEnvironmentService {
  config = TESTING_CONFIG
}
