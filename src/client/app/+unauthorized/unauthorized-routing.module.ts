import { UnauthorizedComponent } from './unauthorized.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UnauthorizedComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.unauthorized.title',
            description: 'i18n.unauthorized.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule { }
