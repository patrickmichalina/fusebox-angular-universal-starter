import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [AdminRoutingModule, SharedModule],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
