import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'About',
            description: 'See contact information and details about the Angular Universal seed at angular.patrickmichalina.com'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
