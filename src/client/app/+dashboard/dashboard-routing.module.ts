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
          { path: '', redirectTo: 'test1' },
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
