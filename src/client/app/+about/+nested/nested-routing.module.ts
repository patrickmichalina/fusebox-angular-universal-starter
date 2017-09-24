import { NestedComponent } from './nested.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NestedComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Nested',
            description: 'Nested'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class NestedRoutingModule { }
