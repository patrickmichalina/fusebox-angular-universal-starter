import { AuthService } from './../services/auth.service'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

@Component({
  selector: 'pm-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCardComponent {
  constructor(private cd: ChangeDetectorRef, private auth: AuthService) { }
  public socialNetworkErr: string

  login(provider: string) {
    switch (provider) {
      case 'facebook': this.auth.signInWithFacebookPopup().catch(err => this.socialNetworkError(err))
        break
      case 'google': this.auth.signInWithGooglePopup().catch(err => this.socialNetworkError(err))
        break
      case 'github': this.auth.signInWithGithubPopup().catch(err => this.socialNetworkError(err))
        break
      case 'twitter': this.auth.signInWithTwitterPopup().catch(err => this.socialNetworkError(err))
        break
      case 'email_new':
        this.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password)
          .take(1)
          .subscribe(res => {
            res.sendEmailVerification()
          }, err => this.networkError(err))
        break
      case 'email_login':
        this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
          .take(1)
          .subscribe(res => {
            console.log(res)
          }, err => this.networkError(err))
        break
      default:
    }
  }

  networkError(err: any) {
    this.form.setErrors({
      ...this.form.errors,
      network: err.message
    })
    this.cd.markForCheck()
  }

  socialNetworkError(err: any) {
    this.socialNetworkErr = err.message
    this.cd.markForCheck()
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
