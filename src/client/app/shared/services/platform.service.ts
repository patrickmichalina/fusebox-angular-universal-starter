import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from '@angular/common'

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
}
