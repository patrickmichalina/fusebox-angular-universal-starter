import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Login',
            description: 'Login to your account now.'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
