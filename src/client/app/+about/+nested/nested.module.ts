import { NestedRoutingModule } from './nested-routing.module'
import { NestedComponent } from './nested.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  imports: [NestedRoutingModule, SharedModule],
  declarations: [NestedComponent],
  exports: [NestedComponent]
})
export class NestedModule { }
