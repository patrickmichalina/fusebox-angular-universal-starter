import { Test1Component } from './test1.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Test1Component,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'Test 1 Page',
            // tslint:disable-next-line:max-line-length
            description: 'Test 1 for angular related projects on github, to showcase the flicker-free http state transfer of an Angular isomorphic application.'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class Test1RoutingModule { }
