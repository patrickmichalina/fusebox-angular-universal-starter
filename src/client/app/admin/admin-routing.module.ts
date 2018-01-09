import { AdminComponent } from './admin.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.admin.title',
            description: 'i18n.admin.description'
          },
          response: {
            cache: {
              directive: 'private'
            }
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
