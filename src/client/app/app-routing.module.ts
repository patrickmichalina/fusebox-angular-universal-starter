import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// tslint:disable:only-arrow-functions
export async function home() {
  return (await import('./home/home.module')).HomeModule
}
export async function unauthorized() {
  return (await import('./unauthorized/unauthorized.module')).UnauthorizedModule
}
export async function about() {
  return (await import('./about/about.module')).AboutModule
}
export async function account() {
  return (await import('./account/account.module')).AccountModule
}
export async function login() {
  return (await import('./login/login.module')).LoginModule
}
export async function logout() {
  return (await import('./logout/logout.module')).LogoutModule
}
export async function signup() {
  return (await import('./signup/signup.module')).SignupModule
}
export async function admin() {
  return (await import('./admin/admin.module')).AdminModule
}
export async function changelog() {
  return (await import('./changelog/changelog.module')).ChangelogModule
}
export async function dashboard() {
  return (await import('./dashboard/dashboard.module')).DashboardModule
}
export async function pages() {
  return (await import('./pages/pages.module')).PagesModule
}
export async function users() {
  return (await import('./users/users.module')).UsersModule
}

export const routes: Routes = [
  { path: '', loadChildren: home },
  { path: 'unauthorized', loadChildren: unauthorized },
  { path: 'about', loadChildren: about },
  { path: 'account', loadChildren: account },
  { path: 'login', loadChildren: login },
  { path: 'logout', loadChildren: logout },
  { path: 'signup', loadChildren: signup },
  { path: 'admin', loadChildren: admin },
  { path: 'changelog', loadChildren: changelog },
  { path: 'dashboard', loadChildren: dashboard },
  { path: 'pages', loadChildren: pages },
  { path: 'users', loadChildren: users }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
