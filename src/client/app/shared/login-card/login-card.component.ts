import { PlatformService } from './../services/platform.service'
import { Router } from '@angular/router'
import { AuthService } from './../services/auth.service'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from 'angularfire2/auth'
import { fromPromise } from 'rxjs/observable/fromPromise'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

@Component({
  selector: 'pm-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCardComponent {
  constructor(private cd: ChangeDetectorRef, private auth: AuthService, public afAuth: AngularFireAuth, router: Router,
    ps: PlatformService) {
    if (ps.isServer) return

    fromPromise(afAuth.auth.getRedirectResult())
      .take(1)
      .subscribe(res => {
        this.isLoading = false
        this.cd.markForCheck()
        // if (res && res.operationType === 'signIn') router.navigate(['/'])
      }, err => this.socialNetworkError(err))
  }

  public socialNetworkErr: string
  public socialNetworkErrEmail: string
  public isLoading = true

  login(provider: string) {
    this.isLoading = true
    switch (provider) {
      case 'facebook': this.auth.signInWithFacebookRedirect().take(1).subscribe(res => undefined, err => this.socialNetworkError(err))
        break
      case 'google': this.auth.signInWithGoogleRedirect().take(1).subscribe(res => undefined, err => this.socialNetworkError(err))
        break
      case 'github': this.auth.signInWithGithubRedirect().take(1).subscribe(res => undefined, err => this.socialNetworkError(err))
        break
      case 'twitter': this.auth.signInWithTwitterRedirect().take(1).subscribe(res => undefined, err => this.socialNetworkError(err))
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
    this.isLoading = false
    this.socialNetworkErrEmail = err.email
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
