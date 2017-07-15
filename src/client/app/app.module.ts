import { EnvironmentService } from './shared/services/environment.service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { NgModule } from '@angular/core';
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2';
import { DOCUMENT, ɵgetDOM, ɵTRANSITION_ID } from '@angular/platform-browser';
import { APP_BOOTSTRAP_LISTENER, APP_ID } from '@angular/core';
import { PlatformService } from './shared/services/platform.service';
import { BrowserModule } from '@angular/platform-browser';

export function removeStyleTags(document: HTMLDocument, ps: PlatformService): any {
  // tslint:disable-next-line:only-arrow-functions
  return function(): void {
    if (ps.isBrowser) {
      const dom = ɵgetDOM();

      const styles: HTMLElement[] =
        Array.prototype.slice.apply(dom.querySelectorAll(document, 'style[ng-transition]'));

      styles.forEach(el => dom.remove(el));
    }
  };
}

export function metaFactory(environmentService: EnvironmentService): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: environmentService.config.pageTitleSeparator,
    applicationName: environmentService.config.name,
    applicationUrl: environmentService.config.server.host,
    defaults: {
      title: environmentService.config.name,
      description: environmentService.config.description,
      'og:image': environmentService.config.og.defaultSocialImage,
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US'
    }
  });
}

@NgModule({
  imports: [
    AppRoutingModule,
    TransferHttpModule,
    BrowserModule.withServerTransition({ appId: 'pm-app' }),
    SharedModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [EnvironmentService]
    })
  ],
  providers: [
    { provide: APP_ID, useValue: 'pm-app' },
    { provide: ɵTRANSITION_ID, useValue: 'pm-app' },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: removeStyleTags,
      deps: [DOCUMENT, PlatformService],
      multi: true
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
