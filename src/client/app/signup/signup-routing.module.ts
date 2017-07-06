import { SignupComponent } from './signup.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Signup',
            description: 'Sign up for an account with us. Create an account to start doing cool things with our application. It\'s easy to register'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
