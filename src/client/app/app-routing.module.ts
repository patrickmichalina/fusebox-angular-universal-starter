import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  ROUTES
} from '@angular/router';
// declare var __process_env__: any;

// export function fuseBoxConfigFactory() {
//   return __process_env__;
// }

// export function getLazyModule(name: string, moduleName: string): any {
//   return () => new Promise((function (resolve, reject) {
//     return FuseBox.exists(`~/client/app/+${name}/${name}.module.js`)
//       ? resolve(require(`~/client/app/+${name}/${name}.module.js`)[`${moduleName}Module`])
//       : FuseBox.import(`./js/bundle-${name}.module.js`, (loaded: any) => loaded ?
//         resolve(require(`~/client/app/+${name}/${name}.module.js`)[`${moduleName}Module`]) :
//         reject(`Unable to load module '${moduleName}Module' from './js/bundle-${name}.module.js`))
//   }))


  // return new Promise((resolve, reject) => {
  //   // const lazy = fuseBoxConfigFactory().lazyBuster;
  //   return FuseBox.exists(`~/client/app/+${name}/${name}.module.js`)
  //     ? resolve(require(`~/client/app/+${name}/${name}.module.js`)[`${moduleName}Module`])
  //     : FuseBox.import(`./js/bundle-${name}.module.js`, (loaded: any) => loaded ?
  //       resolve(require(`~/client/app/+${name}/${name}.module.js`)[`${moduleName}Module`]) :
  //       reject(`Unable to load module '${moduleName}Module' from './js/bundle-${name}.module.js`))
  // })
};

// export function getLazyModule (): any {
//   return new Promise((resolve, reject) => {
//     // const lazy = fuseBoxConfigFactory().lazyBuster;
//     return FuseBox.exists(`~/client/app/+home/home.module.js`)
//       ? resolve(require(`~/client/app/+home/home.module.js`)[`HomeModule`])
//       : FuseBox.import(`./js/bundle-home.module.js`, (loaded: any) => loaded ?
//         resolve(require(`~/client/app/+home/home.module.js`)[`HomeModule`]) :
//         reject(`Unable to load module 'HomeModule' from './js/bundle-${name}.module.js`))
//   })
// };

export const routes: Routes = [
  { path: '', loadChildren: './client/app/+home/home.module#HomeModule' },
  // { path: 'about', loadChildren: () => getLazyModule('about', 'About') },
  // { path: 'search', loadChildren: () => getLazyModule('search', 'Search') },
  // { path: 'login', loadChildren: () => getLazyModule('login', 'Login') },
  // { path: 'logout', loadChildren: () => getLazyModule('logout', 'Logout') },
  // { path: 'signup', loadChildren: () => getLazyModule('signup', 'Signup') },
  // { path: '**', loadChildren: () => getLazyModule('not-found', 'NotFound') },
];
// export function routes1() {
//   return [
//     { path: '', loadChildren: getLazyModule('home', 'Home') },
//     { path: 'about', loadChildren: getLazyModule('about', 'About') },
//     { path: 'search', loadChildren: getLazyModule('search', 'Search') },
//     { path: 'login', loadChildren: getLazyModule('login', 'Login') },
//     { path: 'logout', loadChildren: getLazyModule('logout', 'Logout') },
//     { path: 'signup', loadChildren: getLazyModule('signup', 'Signup') },
//     { path: '**', loadChildren: getLazyModule('not-found', 'NotFound') },
//   ];
// }

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

