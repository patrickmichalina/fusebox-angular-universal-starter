import { SettingService } from './services/setting.service'
import { EnvironmentService } from './services/environment.service'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginCardComponent } from './login-card/login-card.component'
import { CookieService } from './services/cookie.service'
import { CommonModule } from '@angular/common'
import { PlatformService } from './services/platform.service'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { WebSocketService } from './services/web-socket.service'
import { LOGGER_CONFIG, LoggingService } from './services/logging.service'
import { AuthService } from './services/auth.service'
import { COOKIE_HOST_WHITELIST } from './services/http-cookie-interceptor.service'
import { ENV_CONFIG } from '../app.config'
import { NavbarService } from './navbar/navbar.service'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { MaterialModule } from './material.module'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe'
import { ReactiveFormsModule } from '@angular/forms'
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
    MaterialModule,
    ReactiveFormsModule,
    // FlexLayoutModule,
    MarkdownToHtmlModule,
    Angulartics2Module.forChild()
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    Angulartics2Module,
    MaterialModule,
    ClickOutsideDirective,
    LoginCardComponent,
    ReactiveFormsModule,
    // FlexLayoutModule,
    MarkdownToHtmlModule
  ],
  declarations: [
    NavbarComponent,
    ClickOutsideDirective,
    LoginCardComponent
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
    WebSocketService,
    AuthService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
