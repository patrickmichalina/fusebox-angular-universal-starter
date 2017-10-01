import { SignupComponent } from './signup.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SignupComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.signup.title',
            description: 'i18n.signup.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
