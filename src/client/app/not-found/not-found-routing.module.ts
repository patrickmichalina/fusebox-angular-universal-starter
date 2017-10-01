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
            title: 'i18n.not-found.title',
            description: 'i18n.not-found.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
