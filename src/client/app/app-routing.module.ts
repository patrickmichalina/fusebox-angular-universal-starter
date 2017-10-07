import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', loadChildren: '~/client/app/+home/home.module#HomeModule' },
  { path: 'about', loadChildren: '~/client/app/+about/about.module#AboutModule' },
  { path: 'account', loadChildren: '~/client/app/+account/account.module#AccountModule' },
  { path: 'search', loadChildren: '~/client/app/+search/search.module#SearchModule' },
  { path: 'login', loadChildren: '~/client/app/+login/login.module#LoginModule' },
  { path: 'logout', loadChildren: '~/client/app/+logout/logout.module#LogoutModule' },
  { path: 'signup', loadChildren: '~/client/app/+signup/signup.module#SignupModule' },
  { path: 'admin', loadChildren: '~/client/app/+admin/admin.module#AdminModule' },
  { path: 'changelog', loadChildren: '~/client/app/+changelog/changelog.module#ChangelogModule' },
  { path: 'dashboard', loadChildren: '~/client/app/+dashboard/dashboard.module#DashboardModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
