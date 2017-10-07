import { CookieService } from './../shared/services/cookie.service';
import { PlatformService } from './../shared/services/platform.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(public afAuth: AngularFireAuth, private ps: PlatformService, private cs: CookieService) {
    // afAuth.authState.subscribe(console.log)
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  // login2() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  // }
  login2() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }
  logout() {
    this.afAuth.auth.signOut()
  }
}
