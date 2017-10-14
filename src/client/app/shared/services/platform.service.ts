import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { JwtHelper } from 'angular2-jwt'
export interface IPlatformService {
  isBrowser: boolean
  isServer: boolean
}

@Injectable()
export class PlatformService implements IPlatformService {
  constructor( @Inject(PLATFORM_ID) private platformId: any) { }

  public get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId)
  }

  public get isServer(): boolean {
    return isPlatformServer(this.platformId)
  }

  public decodeJwt(val: string) {
    console.log(val)
    const d = new JwtHelper()
    const c = d.decodeToken(val)
    console.log(c)
    return c
  }
}
