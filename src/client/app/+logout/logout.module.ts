import { LogoutRoutingModule } from './logout-routing.module'
import { LogoutComponent } from './logout.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [LogoutRoutingModule, SharedModule],
  declarations: [LogoutComponent],
  exports: [LogoutComponent]
})
export class LogoutModule { }
