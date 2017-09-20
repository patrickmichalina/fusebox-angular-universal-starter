import { TestComponent } from './test.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', redirectTo: 'test'
      },

      {
        path: 'test',
        component: TestComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Test Page',
            // tslint:disable-next-line:max-line-length
            description: 'Test for angular related projects on github, to showcase the flicker-free http state transfer of an Angular isomorphic application.'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class TestRoutingModule { }
