import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from './services/cookie.service';
import { PlatformService } from './services/platform.service';
import { TransferHttp } from './services/transfer-http.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [CommonModule, RouterModule, NavbarComponent],
  providers: [
    PlatformService,
    CookieService,
    TransferHttp
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
