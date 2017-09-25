import { EnvironmentService } from './services/environment.service'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { CookieService } from './services/cookie.service'
import { CommonModule } from '@angular/common'
import { PlatformService } from './services/platform.service'
import { LOGGER_CONFIG, LoggingService } from './services/logging.service'
import { COOKIE_HOST_WHITELIST } from './services/http-cookie-interceptor.service'
import { ENV_CONFIG } from '../app.config'
import { NavbarService } from './navbar/navbar.service'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { MdButtonModule, MdCardModule } from '@angular/material'
// import { FlexLayoutModule } from '@angular/flex-layout'
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe'
import { DashboardPageHeaderComponent } from "./dashboard-page-header/dashboard-page-header.component";
import {MdIconModule} from '@angular/material';
import { DashboardPageFooterComponent } from "./dashboard-page-footer/dashboard-page-footer.component";

declare var __process_env__: any

export function fuseBoxConfigFactory() {
  return __process_env__
}

export function loggerConfigFactory(ps: PlatformService, gooogleAnalytics: Angulartics2GoogleAnalytics) {
  return {
    name: 'Angular Universal App',
    type: 'app',
    streams: [{
      level: 'error',
      stream: {
        write: (err: any) => {
          if (ps.isBrowser) {
            console.error('Application error', err)
            if ((window as any).ga) {
              gooogleAnalytics.exceptionTrack(err)
            } else {
              console.log('(Application error was not logged to analytics provider)')
            }
          } else {
            console.error(err)
          }
        }
      },
      type: 'raw'
    }]
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    // FlexLayoutModule,
    MarkdownToHtmlModule,
    Angulartics2Module.forChild()
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    Angulartics2Module,
    MdButtonModule,
    MdCardModule,
    //FlexLayoutModule,
    MarkdownToHtmlModule,
    DashboardPageHeaderComponent,
    DashboardPageFooterComponent

  ],
  declarations: [NavbarComponent, DashboardPageHeaderComponent, DashboardPageFooterComponent],
  providers: [
    { provide: ENV_CONFIG, useFactory: fuseBoxConfigFactory },
    { provide: COOKIE_HOST_WHITELIST, useValue: ['angular.patrickmichalina.com'] },
    {
      provide: LOGGER_CONFIG,
      useFactory: loggerConfigFactory,
      deps: [PlatformService, Angulartics2GoogleAnalytics]
    },
    PlatformService,
    CookieService,
    EnvironmentService,
    NavbarService,
    LoggingService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
