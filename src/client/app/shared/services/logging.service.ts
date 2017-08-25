import { Injectable } from '@angular/core';
import { createLogger } from '@expo/bunyan';

export interface ILoggingService {
  trace(...msg: any[]): void;
  debug(...msg: any[]): void;
  info(...msg: any[]): void;
  warn(...msg: any[]): void;
  error(...msg: any[]): void;
}

@Injectable()
export class LoggingService implements ILoggingService {
  private logger = createLogger({ name: 'Angular Universal App', type: 'app' });

  trace(...msg: any[]): void {
    this.logger.trace(msg);
  }

  debug(...msg: any[]): void {
    this.logger.debug(msg);
  }

  info(...msg: any[]): void {
    this.logger.info(msg);
  }

  warn(...msg: any[]): void {
    this.logger.warn(msg);
  }

  error(...msg: any[]): void {
    this.logger.error(msg);
  }
}
