import { ModuleWithProviders, NgModule } from '@angular/core'
import { PlatformService } from './services/platform.service'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { CookieService } from './services/cookie.service'
import { CommonModule } from '@angular/common'
import { EnvironmentService } from './services/environment.service'
import { LOGGER_CONFIG, LoggingService } from './services/logging.service'
import { ENV_CONFIG } from '../app.config'
import { NavbarService } from './navbar/navbar.service'
import { Angulartics2Module } from 'angulartics2'
import { MdTabsModule, MdToolbarModule } from '@angular/material'

declare var __process_env__: any

export function fuseBoxConfigFactory() {
  return __process_env__
}

@NgModule({
  imports: [CommonModule, RouterModule, Angulartics2Module.forChild(), MdTabsModule, MdToolbarModule],
  exports: [CommonModule, RouterModule, NavbarComponent, Angulartics2Module],
  declarations: [NavbarComponent],
  providers: [
    { provide: ENV_CONFIG, useFactory: fuseBoxConfigFactory },
    {
      provide: LOGGER_CONFIG,
      useValue: {
        name: 'Angular Universal App',
        type: 'app'
      }
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
