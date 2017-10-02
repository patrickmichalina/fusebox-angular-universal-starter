import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: '', redirectTo: 'test', pathMatch: 'full' },
          {
            path: 'test',
            loadChildren: '~/client/app/+dashboard/+test/test.module#TestModule'
          },
          {
            path: 'test1',
            loadChildren: '~/client/app/+dashboard/+test1/test1.module#Test1Module'
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
