import { HomeComponent } from './home.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Home'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
