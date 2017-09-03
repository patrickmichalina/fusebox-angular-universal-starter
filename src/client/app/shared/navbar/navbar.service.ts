import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'

export interface INavbarService {
  menu$: Observable<any[]>
}

@Injectable()
export class NavbarService implements INavbarService {
  menu$ = Observable.of([
    { route: '', name: 'Home' },
    { route: 'about', name: 'About' },
    { route: 'search', name: 'Search' },
    { route: 'login', name: 'Login' },
    { route: 'logout', name: 'Logout' },
    { route: 'signup', name: 'Signup' },
    { route: 'admin', name: 'Admin' }
  ])
}
