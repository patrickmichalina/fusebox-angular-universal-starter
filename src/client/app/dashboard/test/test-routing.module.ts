import { TestComponent } from './test.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'
import { TestChild1Component } from './testChild1/testChild1.component'
import { TestChildComponent } from './testChild/testChild.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestComponent,
        canActivateChild: [MetaGuard],
        children: [
          { path: '', redirectTo: 'test-child', pathMatch: 'full'  },
          {
            path: 'test-child',
            component: TestChildComponent,
            data: {
              meta: {
                title: 'Test Child',
                // tslint:disable-next-line:max-line-length
                description: 'Test for angular related projects on github, to showcase the flicker-free http state transfer of an Angular isomorphic application.'
              }
            }
          },
          {
            path: 'test-child-1',
            component: TestChild1Component,
            data: {
              meta: {
                title: 'Test Child 1 Page',
                // tslint:disable-next-line:max-line-length
                description: 'Test for angular related projects on github, to showcase the flicker-free http state transfer of an Angular isomorphic application.'
              }
            }
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class TestRoutingModule { }
