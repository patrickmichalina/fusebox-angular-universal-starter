import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';
import * as log from 'loglevel';
import * as loglevelStdStreams from 'loglevel-std-streams';

export interface ILoggingService {
  trace(...msg: any[]): void;
  debug(...msg: any[]): void;
  info(...msg: any[]): void;
  warn(...msg: any[]): void;
  error(...msg: any[]): void;
}

@Injectable()
export class LoggingService implements ILoggingService {

  constructor(platformService: PlatformService) {
    if (platformService.isServer) {
      loglevelStdStreams(log); // to stderr
    }
  }

  trace(...msg: any[]): void {
    log.trace(msg);
  }

  debug(...msg: any[]): void {
    log.debug(msg);
  }

  info(...msg: any[]): void {
    log.info(msg);
  }

  warn(...msg: any[]): void {
    log.warn(msg);
  }

  error(...msg: any[]): void {
    log.error(msg);
  }
}
