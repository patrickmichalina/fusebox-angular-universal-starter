import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', loadChildren: async () => (await import('./home/home.module')).HomeModule },
  { path: 'unauthorized', loadChildren: async () => (await import('./unauthorized/unauthorized.module')).UnauthorizedModule },
  { path: 'about', loadChildren: async () => (await import('./about/about.module')).AboutModule },
  { path: 'account', loadChildren: async () => (await import('./account/account.module')).AccountModule },
  { path: 'login', loadChildren: async () => (await import('./login/login.module')).LoginModule },
  { path: 'logout', loadChildren: async () => (await import('./logout/logout.module')).LogoutModule },
  { path: 'signup', loadChildren: async () => (await import('./signup/signup.module')).SignupModule },
  { path: 'admin', loadChildren: async () => (await import('./admin/admin.module')).AdminModule },
  { path: 'changelog', loadChildren: async () => (await import('./changelog/changelog.module')).ChangelogModule },
  { path: 'dashboard', loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule },
  { path: 'pages', loadChildren: async () => (await import('./pages/pages.module')).PagesModule },
  { path: 'users', loadChildren: async () => (await import('./users/users.module')).UsersModule }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
