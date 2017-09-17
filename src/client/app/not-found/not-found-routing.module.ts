import { NotFoundComponent } from './not-found.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: NotFoundComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Not Found',
            description: 'The page you requested can not be found.'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
