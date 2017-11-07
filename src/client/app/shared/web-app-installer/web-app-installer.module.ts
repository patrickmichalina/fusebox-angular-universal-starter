import { NgModule } from '@angular/core'
import { WebAppInstallerService } from './web-app-installer.service'
import { WebAppInstallerComponent } from './web-app-installer.component'

@NgModule({
  declarations: [WebAppInstallerComponent],
  exports: [WebAppInstallerComponent],
  providers: [WebAppInstallerService]
})
export class WebAppInstallerlModule { }
