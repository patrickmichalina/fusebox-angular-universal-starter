import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';

export const getLazyModule = function (name: string, moduleName: string): any {
  return new Promise((resolve, reject) => {
    return FuseBox.exists(`~/client/app/+${name}/${name}.module.js`)
      ? resolve(require(`~/client/app/+${name}/${name}.module.js`)[`${moduleName}Module`])
      : FuseBox.import(`./js/bundle-${name}.module.js`, (loaded: any) => loaded ?
        resolve(require(`~/client/app/+${name}/${name}.module.js`)[`${moduleName}Module`]) :
        reject('Unable to load module \'AboutModule\' from \'/js/${name}.module.js\'.'))
  })
};

export const routes: Routes = [
  { path: '', loadChildren: () => getLazyModule('home', 'Home') },
  { path: 'about', loadChildren: () =>  getLazyModule('about', 'About') },
  { path: 'search', loadChildren: () => getLazyModule('search', 'Search') },
  { path: 'login', loadChildren: () => getLazyModule('login', 'Login') },
  { path: 'logout', loadChildren: () => getLazyModule('logout', 'Logout') },
  { path: 'signup', loadChildren: () => getLazyModule('signup', 'Signup') },
  { path: '**', loadChildren: () => getLazyModule('not-found', 'NotFound') },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading, initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

