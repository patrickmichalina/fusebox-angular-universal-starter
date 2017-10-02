import { TestRoutingModule } from './test-routing.module'
import { TestComponent } from './test.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { TestChildComponent } from './testChild/testChild.component'
import { TestChild1Component } from './testChild1/testChild1.component'

@NgModule({
  imports: [TestRoutingModule, SharedModule],
  declarations: [TestComponent, TestChild1Component, TestChildComponent],
  exports: [TestComponent, TestChild1Component, TestChildComponent]
})
export class TestModule { }
