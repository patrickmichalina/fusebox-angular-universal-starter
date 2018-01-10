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
            loadChildren: async () => (await import('./test/test.module')).TestModule
          },
          {
            path: 'test1',
            loadChildren: async () => (await import('./test1/test1.module')).Test1Module
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
