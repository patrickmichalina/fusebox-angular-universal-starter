import { SignupComponent } from './signup.component'
import { SignupRoutingModule } from './signup-routing.module'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [SignupRoutingModule, SharedModule],
  declarations: [SignupComponent],
  exports: [SignupComponent]
})
export class SignupModule { }
