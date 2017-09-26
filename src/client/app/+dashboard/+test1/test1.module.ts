import { Test1RoutingModule } from './test1-routing.module'
import { Test1Component } from './test1.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  imports: [Test1RoutingModule, SharedModule],
  declarations: [Test1Component],
  exports: [Test1Component]
})
export class Test1Module { }
