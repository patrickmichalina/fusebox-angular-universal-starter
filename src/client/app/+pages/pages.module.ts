import { PagesRoutingModule } from './pages-routing.module'
import { PagesComponent } from './pages.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [PagesRoutingModule, SharedModule],
  declarations: [PagesComponent],
  exports: [PagesComponent]
})
export class PagesModule { }
