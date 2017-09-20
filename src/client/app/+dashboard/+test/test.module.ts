import { TestRoutingModule } from './test-routing.module'
import { TestComponent } from './test.component'
import { TestService } from './test.service'
import { NgModule } from '@angular/core'
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  imports: [TestRoutingModule, SharedModule],
  declarations: [TestComponent],
  exports: [TestComponent],
  providers: [TestService]
})
export class TestModule { }
