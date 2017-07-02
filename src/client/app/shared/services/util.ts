import { Observable } from 'rxjs/Observable';
import { observable } from 'rxjs/symbol/observable';

/**
 * Determine if the argument is shaped like a Promise
 */
export function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function';
}

/**
 * Determine if the argument is an Observable
 */
export function isObservable(obj: any | Observable<any>): obj is Observable<any> {
  return !!(obj && obj[observable]);
}
