import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', loadChildren: () => import('./+home/home.module').then(a => a.HomeModule) },
  { path: 'unauthorized', loadChildren: () => import('./+unauthorized/unauthorized.module').then(a => a.UnauthorizedModule) },
  { path: 'about', loadChildren: () => import('./+about/about.module').then(a => a.AboutModule) },
  { path: 'account', loadChildren: () => import('./+account/account.module').then(a => a.AccountModule) },
  { path: 'login', loadChildren: () => import('./+login/login.module').then(a => a.LoginModule) },
  { path: 'logout', loadChildren: () => import('./+logout/logout.module').then(a => a.LogoutModule) },
  { path: 'signup', loadChildren: () => import('./+signup/signup.module').then(a => a.SignupModule) },
  { path: 'admin', loadChildren: () => import('./+admin/admin.module').then(a => a.AdminModule) },
  { path: 'changelog', loadChildren: () => import('./+changelog/changelog.module').then(a => a.ChangelogModule) },
  { path: 'dashboard', loadChildren: () => import('./+dashboard/dashboard.module').then(a => a.DashboardModule) },
  { path: 'pages', loadChildren: () => import('./+pages/pages.module').then(a => a.PagesModule) },
  { path: 'users', loadChildren: () => import('./+users/users.module').then(a => a.UsersModule) }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
