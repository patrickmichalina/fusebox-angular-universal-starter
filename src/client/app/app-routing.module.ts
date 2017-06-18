import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* define app module routes here, e.g., to lazily load a module
   (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
@NgModule({
  imports: [
    RouterModule.forRoot([

    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

