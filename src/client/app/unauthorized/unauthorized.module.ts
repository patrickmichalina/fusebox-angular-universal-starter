import { UnauthorizedRoutingModule } from './unauthorized-routing.module'
import { UnauthorizedComponent } from './unauthorized.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [UnauthorizedRoutingModule, SharedModule],
  declarations: [UnauthorizedComponent],
  exports: [UnauthorizedComponent]
})
export class UnauthorizedModule { }
