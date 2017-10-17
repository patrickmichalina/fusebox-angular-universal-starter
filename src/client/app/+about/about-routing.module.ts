import { AboutComponent } from './about.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.about.title',
            description: 'i18n.about.description'
          },
          response: {
            cache: {
              directive: 'no-cache'
            }
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
