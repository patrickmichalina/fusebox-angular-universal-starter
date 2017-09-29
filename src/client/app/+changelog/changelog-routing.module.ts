import { ChangelogComponent } from './changelog.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ChangelogComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.changelog.title',
            description: 'i18n.changelog.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class ChangelogRoutingModule { }
