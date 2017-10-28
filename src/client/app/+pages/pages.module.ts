import { PagesRoutingModule } from './pages-routing.module'
import { PagesComponent } from './pages.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { PageFormComponent } from './page-form/page-form.component'

@NgModule({
  imports: [PagesRoutingModule, SharedModule],
  declarations: [PagesComponent, PageFormComponent],
  exports: [PagesComponent],
  entryComponents: [PageFormComponent]
})
export class PagesModule { }
