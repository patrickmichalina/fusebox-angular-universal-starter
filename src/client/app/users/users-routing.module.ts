import { UsersComponent } from './users.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'
import { AdminGuard } from '../shared/services/guard-admin.service'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        canActivate: [MetaGuard, AdminGuard],
        data: {
          meta: {
            title: 'i18n.users.title',
            description: 'i18n.users.description'
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
export class UsersRoutingModule { }
