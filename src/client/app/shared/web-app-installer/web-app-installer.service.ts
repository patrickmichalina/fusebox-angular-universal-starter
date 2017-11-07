import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable()
export class WebAppInstallerService {
  get isIosWebApp() {
    return isPlatformBrowser(this.platformId) &&
      'standalone' in window.navigator &&
      (window.navigator as any).standalone !== true
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
}
