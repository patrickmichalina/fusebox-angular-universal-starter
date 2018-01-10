import { ChangelogComponent } from './changelog.component'
import { ChangelogRoutingModule } from './changelog-routing.module'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [ChangelogRoutingModule, SharedModule],
  declarations: [ChangelogComponent],
  exports: [ChangelogComponent]
})
export class ChangelogModule { }
