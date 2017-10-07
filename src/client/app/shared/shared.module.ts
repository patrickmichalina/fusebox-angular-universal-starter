import { EnvironmentService } from './services/environment.service'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { UserBoxComponent } from './user-box/user-box.component'
import { CookieService } from './services/cookie.service'
import { CommonModule } from '@angular/common'
import { PlatformService } from './services/platform.service'
import { SettingService } from './services/setting.service'
import { WebSocketService } from './services/web-socket.service'
import { LOGGER_CONFIG, LoggingService } from './services/logging.service'
import { COOKIE_HOST_WHITELIST } from './services/http-cookie-interceptor.service'
import { ENV_CONFIG } from '../app.config'
import { NavbarService } from './navbar/navbar.service'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule } from '@angular/material'
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe'
// import { FlexLayoutModule } from '@angular/flex-layout'

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
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    // FlexLayoutModule,
    MarkdownToHtmlModule,
    Angulartics2Module.forChild()
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    UserBoxComponent,
    Angulartics2Module,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    // FlexLayoutModule,
    MarkdownToHtmlModule
  ],
  declarations: [
    NavbarComponent,
    UserBoxComponent
  ],
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
    LoggingService,
    SettingService,
    WebSocketService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
