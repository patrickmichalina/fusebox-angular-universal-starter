import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { SearchService } from './search.service'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [SearchRoutingModule, SharedModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: [SearchService]
})
export class SearchModule { }
