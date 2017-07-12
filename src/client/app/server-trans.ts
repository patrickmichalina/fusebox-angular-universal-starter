import { PlatformService } from './shared/services/platform.service';
import { DOCUMENT, ɵgetDOM, ɵTRANSITION_ID } from '@angular/platform-browser';
import { APP_BOOTSTRAP_LISTENER, APP_ID, ModuleWithProviders, NgModule } from '@angular/core';

export function removeStyleTags(document: HTMLDocument, ps: PlatformService): any {
  return function() {
    if (ps.isBrowser) {
      const dom = ɵgetDOM();

      const styles: HTMLElement[] =
        Array.prototype.slice.apply(dom.querySelectorAll(document, 'style[ng-transition]'));

      styles.forEach(el => dom.remove(el));s
    }
  };
}

@NgModule({})
export class ServerTransition {
  public static forRoot({ appId }: { appId: string }): ModuleWithProviders {
    return {
      ngModule: this,
      providers: [
        { provide: APP_ID, useValue: appId },
        { provide: ɵTRANSITION_ID, useValue: appId },
        {
          provide: APP_BOOTSTRAP_LISTENER,
          useFactory: removeStyleTags,
          deps: [DOCUMENT, PlatformService],
          multi: true
        }
      ]
    };
  }
}