import { Injectable } from '@angular/core'
import { ICookieService } from '../client/app/shared/services/cookie.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class MockCookieService implements ICookieService {
  private cookieSource = new BehaviorSubject<{ [key: string]: any }>(this.getAll())
  public cookies$ = this.cookieSource.asObservable()
  public mockCookieStore: any = { }

  get(name: string): any {
    return this.mockCookieStore[name]
  }

  getAll() {
    return this.mockCookieStore || {}
  }

  set(name: string, value: any, options?: Cookies.CookieAttributes | undefined): void {
    this.mockCookieStore[name] = value
    this.cookieSource.next(this.getAll())
  }

  remove(name: string, options?: Cookies.CookieAttributes | undefined): void {
    const { [name]: omit, ...newObject } = this.mockCookieStore
    this.mockCookieStore = newObject
    this.cookieSource.next(this.getAll())
  }
}
