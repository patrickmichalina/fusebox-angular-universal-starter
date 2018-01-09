import { LogoutComponent } from './logout.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LogoutComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.logout.title',
            description: 'i18n.logout.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class LogoutRoutingModule { }
