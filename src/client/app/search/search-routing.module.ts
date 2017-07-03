import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Search'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
