import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard.component'

// tslint:disable:only-arrow-functions
export async function test() {
  return (await import('./test/test.module')).TestModule
}
export async function test1() {
  return (await import('./test1/test1.module')).Test1Module
}

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
            loadChildren: test
          },
          {
            path: 'test1',
            loadChildren: test1
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
