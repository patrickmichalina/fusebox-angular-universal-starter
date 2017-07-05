import { SignupComponent } from './signup.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
