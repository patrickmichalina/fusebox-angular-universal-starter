import { LOGGER_CONFIG, LoggingService } from './services/logging.service'
import { SettingService } from './services/setting.service'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginCardComponent } from './login-card/login-card.component'
import { CookieService } from './services/cookie.service'
import { CommonModule } from '@angular/common'
import { PlatformService } from './services/platform.service'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { WebSocketService } from './services/web-socket.service'
import { EnvironmentService } from './services/environment.service'
import { COOKIE_HOST_WHITELIST } from './services/http-cookie-interceptor.service'
import { ENV_CONFIG } from '../app.config'
import { NavbarService } from './navbar/navbar.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga'
import { MaterialModule } from './material.module'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { SocialButtonDirective } from './directives/social-button.directive'
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseDatabaseService } from './services/firebase-database.service'
import { InjectionService } from './services/injection.service'
import { MinifierService } from './services/minifier.service'
import { QuillEditorComponent } from './quill-editor/quill-editor.component'
import { ServerResponseService } from './services/server-response.service'
import { SEOService } from './services/seo.service'
import { HtmlOutletDirective } from './directives/html-outlet.directive'
import { KeysPipe } from './pipes/keys.pipe'
import { KeyValuePipe } from './pipes/key-value.pipe'
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe'
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component'
import { InjectionFormComponent } from './injection-form/injection-form.component'
import { StyleInjectionFormComponent } from './style-injection-form/style-injection-form.component'
import { KeyValueFormComponent } from './key-value-form/key-value-form.component'
import { CacheFormComponent } from './cache-form/cache-form.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { LoginGuard } from './services/guard-login.service'
import { AdminGuard } from './services/guard-admin.service'

declare var __process_env__: any

export function fuseBoxConfigFactory() {
  return JSON.parse(__process_env__.angularAppConfig)
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
    FormsModule,
    ReactiveFormsModule,
    MarkdownToHtmlModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    MaterialModule,
    ClickOutsideDirective,
    SocialButtonDirective,
    LoginCardComponent,
    FormsModule,
    ReactiveFormsModule,
    MarkdownToHtmlModule,
    QuillEditorComponent,
    HtmlOutletDirective,
    KeysPipe,
    KeyValuePipe,
    SanitizeHtmlPipe,
    ModalConfirmationComponent,
    InjectionFormComponent,
    StyleInjectionFormComponent,
    KeyValueFormComponent,
    CacheFormComponent,
    FlexLayoutModule
  ],
  entryComponents: [
    ModalConfirmationComponent
  ],
  declarations: [
    NavbarComponent,
    ClickOutsideDirective,
    SocialButtonDirective,
    LoginCardComponent,
    QuillEditorComponent,
    HtmlOutletDirective,
    KeysPipe,
    KeyValuePipe,
    SanitizeHtmlPipe,
    ModalConfirmationComponent,
    InjectionFormComponent,
    StyleInjectionFormComponent,
    KeyValueFormComponent,
    CacheFormComponent
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
    FirebaseDatabaseService,
    InjectionService,
    MinifierService,
    ServerResponseService,
    SEOService,
    LoginGuard,
    AdminGuard
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
