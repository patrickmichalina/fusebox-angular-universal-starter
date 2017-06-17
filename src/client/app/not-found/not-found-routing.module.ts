import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '**', component: NotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
