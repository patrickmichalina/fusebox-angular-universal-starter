import { PlatformService } from './services/platform.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from './services/cookie.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EnvironmentService } from './services/environment.service';
import { LoggingService } from './services/logging.service';
import { ENV_CONFIG } from '../app.config';
import { NavbarService } from './navbar/navbar.service';
declare var __process_env__: any;

export function fuseBoxConfigFactory() {
  return __process_env__;
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [CommonModule, RouterModule, NavbarComponent],
  providers: [
    { provide: ENV_CONFIG, useFactory: fuseBoxConfigFactory },
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
    };
  }
}
