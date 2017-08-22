import { Injectable } from '@angular/core';

export interface ITransferState {
  get(key: string): any;
  keys(): IterableIterator<string>;
  set(key: string, value: any): Map<string, any>;
  toJson(): any;
  initialize(obj: { [key: string]: any }): Map<string, any>;
  bust(): Map<string, any>;
  bustByKey(key: string): Map<string, any>;
  bustByKeyPattern(pattern: RegExp): Map<string, any>;
}

@Injectable()
export class TransferState implements ITransferState {
  private _map = new Map<string, any>();

  keys() {
    return this._map.keys();
  }

  get(key: string): any {
    return this._map.get(key);
  }

  set(key: string, value: any): Map<string, any> {
    return this._map.set(key, value);
  }

  bust(): Map<string, any> {
    this._map = new Map<string, any>();
    return this._map;
  }

  bustByKey(key: string): Map<string, any> {
    this._map.delete(key);
    return this._map;
  }

  bustByKeyPattern(pattern: RegExp): Map<string, any> {
    Array.from(this.keys())
      .filter(a => pattern.test(a))
      .forEach(key =>  this._map.delete(key));
    return this._map;
  }

  toJson(): any {
    const obj: any = {};
    Array.from(this.keys())
      .forEach(key => {
        obj[key] = this.get(key);
      });
    return obj;
  }

  initialize(obj: { [key: string]: any }): Map<string, any> {
    Object.keys(obj).forEach(key => this.set(key, obj[key]));
    return this._map;
  }

  // tslint:disable:no-empty
  inject(): void { }
}
