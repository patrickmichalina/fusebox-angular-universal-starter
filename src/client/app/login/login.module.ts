import { LoginComponent } from './login.component'
import { LoginRoutingModule } from './login-routing.module'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [LoginRoutingModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
