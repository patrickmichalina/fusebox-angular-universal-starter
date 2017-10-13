import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import '../../../operators'

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(ars: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.map(a => a ? true : false)
  }
}
