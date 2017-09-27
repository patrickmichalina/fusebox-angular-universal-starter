import { SearchComponent } from './search.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.search.title',
            description: 'i18n.search.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
