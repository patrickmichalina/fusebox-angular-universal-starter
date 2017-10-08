import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { FormControl, FormGroup, Validators } from '@angular/forms'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

@Component({
  selector: 'pm-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCardComponent {
  constructor(public afAuth: AngularFireAuth) { }

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
      case 'email_new':
        this.afAuth.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password)
          .then(a => {
            console.log(a)
            a.sendEmailVerification()
          })
        break
      case 'email_login':
        this.afAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
        break
      default:
    }
  }

  public form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
}
