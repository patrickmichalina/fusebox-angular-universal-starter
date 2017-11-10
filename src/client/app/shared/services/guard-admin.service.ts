import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { ServerResponseService } from './server-response.service'
import '../../../operators'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private srs: ServerResponseService) { }

  canActivate(ars: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAdmin$.do(a => {
      if (!a) {
        this.srs.setUnauthorized()
        this.router.navigate(['unauthorized'], { queryParams: { redirect: state.url } })
      }
    })
  }
}
