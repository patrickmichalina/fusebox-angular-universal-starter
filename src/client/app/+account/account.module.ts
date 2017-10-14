import { AccountRoutingModule } from './account-routing.module'
import { AccountComponent } from './account.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [AccountRoutingModule, SharedModule],
  declarations: [AccountComponent],
  exports: [AccountComponent]
})
export class AccountModule { }
