import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

export interface IServerResponseService {
  getHeader(key: string): string;
  setHeader(key: string, value: string): this;
  setHeaders(dictionary: { [key: string]: string }): this;
  setStatus(code: number, message?: string): this;
  setNotFound(message?: string): this;
  setError(message?: string): this;
}

@Injectable()
export class ServerResponseService implements IServerResponseService {

  private response: Response;

  constructor( @Optional() @Inject(RESPONSE) res: any) {
    this.response = res;
  }

  getHeader(key: string): string {
    return this.response.getHeader(key);
  }

  setHeader(key: string, value: string): this {
    if (this.response)
      this.response.header(key, value);
    return this;
  }

  setHeaders(dictionary: { [key: string]: string }): this {
    if (this.response)
      Object.keys(dictionary).forEach(key => this.setHeader(key, dictionary[key]));
    return this;
  }

  setStatus(code: number, message?: string): this {
    if (this.response) {
      this.response.statusCode = code;
      if (message)
        this.response.statusMessage = message;
    }
    return this;
  }

  setNotFound(message = 'not found'): this {
    if (this.response) {
      this.response.statusCode = 404;
      this.response.statusMessage = message;
    }
    return this;
  }

  setError(message = 'internal server error'): this {
    if (this.response) {
      this.response.statusCode = 500;
      this.response.statusMessage = message;
    }
    return this;
  }
}
