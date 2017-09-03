import { AboutRoutingModule } from './about-routing.module'
import { AboutComponent } from './about.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [AboutRoutingModule, SharedModule],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
