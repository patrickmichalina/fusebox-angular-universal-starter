import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'

export interface INavbarService {
  readonly menu$: Observable<ReadonlyArray<any>>
}

@Injectable()
export class NavbarService implements INavbarService {
  readonly menu$ = Observable.of([
    { route: 'dashboard', name: 'Dashboard' },
    { route: 'about', name: 'About' }
  ])
}
