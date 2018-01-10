import { LoginComponent } from './login.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.login.title',
            description: 'i18n.login.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
