import { NotFoundComponent } from './not-found.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          // meta: {
          //   title: 'i18n.not-found.title',
          //   description: 'i18n.not-found.description'
          // }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
