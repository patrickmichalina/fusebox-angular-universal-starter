import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import '../../../operators'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(ars: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAdmin$.do(a => {
      if (!a) {
        console.log('should redirect here')
      }
    })
  }
}
