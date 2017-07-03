import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from './services/cookie.service';
import { PlatformService } from './services/platform.service';
import { EnvironmentService } from './services/environment.service';
import { ENV_CONFIG, FuseBoxEnvConfig } from '../app.config';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [CommonModule, RouterModule, NavbarComponent],
  providers: [
    { provide: ENV_CONFIG, useValue: FuseBoxEnvConfig },
    PlatformService,
    CookieService,
    EnvironmentService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
