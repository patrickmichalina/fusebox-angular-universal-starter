import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { User } from 'firebase/app'

export interface IAuthService {
  logout(): void
  user$: Observable<User>
}

@Injectable()
export class AuthService implements IAuthService {
  logout(): void {
    throw new Error('Method not implemented.')
  }
  user$: Observable<any>

}
