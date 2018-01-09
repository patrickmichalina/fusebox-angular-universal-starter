import { UsersRoutingModule } from './users-routing.module'
import { UsersComponent } from './users.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [UsersRoutingModule, SharedModule],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule { }
