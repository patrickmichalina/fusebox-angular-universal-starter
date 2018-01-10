import { AccountComponent } from './account.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'
import { LoginGuard } from '../shared/services/guard-login.service'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,
        canActivate: [MetaGuard, LoginGuard],
        data: {
          meta: {
            title: 'i18n.account.title',
            description: 'i18n.account.description'
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
export class AccountRoutingModule { }
