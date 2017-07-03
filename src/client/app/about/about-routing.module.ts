import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'About'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
