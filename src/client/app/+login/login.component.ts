import { AuthService } from './../shared/services/auth.service'
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
  constructor(public afAuth: AngularFireAuth, public auth: AuthService) { }

  login(provider: string) {
    switch (provider) {
      case 'facebook': this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        break
      case 'google': this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        break
      case 'github': this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
        break
      case 'twitter': this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
        break
      default:
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.auth.logout())
  }
}
