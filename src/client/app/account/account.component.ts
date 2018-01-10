import { AuthService } from './../shared/services/auth.service'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewChild } from '@angular/core'
import { PlatformService } from './../shared/services/platform.service'
import { MatExpansionPanel, MatSnackBar } from '@angular/material'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  @HostBinding('class.card-float-container') containerClass = true
  @ViewChild('passwordPanel') passwordPanel: MatExpansionPanel
  @ViewChild('profilePanel') profilePanel: MatExpansionPanel
  @ViewChild('socialPanel') socialPanel: MatExpansionPanel
  // private DEBOUNCE_TIME = 750

  public detailForm = new FormGroup({
    displayName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required
    ])
  })

  public passForm = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.required
    ])
  })
  public user$ = this.auth.user$
  // private userSource = new Subject()
  // private photoURL$ = new Subject<string>()
  // public us$ = this.afAuth.idToken
  // public user$ = this.userSource
  //   .startWith(this.ts.get(AUTH_TS_KEY, {}))
  //   .map(a => {
  //     const emailVerified = (a as any).emailVerified
  //     return {
  //       ...a,
  //       emailColor: emailVerified ? 'primary' : 'accent',
  //       emailIcon: emailVerified ? 'fa-check-circle' : 'fa-question-circle',
  //       emailTooltip: emailVerified ? 'confirmed email' : 'unconfirmed email'
  //     }
  //   })

  constructor(private auth: AuthService, private snackBar: MatSnackBar, ps: PlatformService, private cd: ChangeDetectorRef) {
    // if (ps.isBrowser) {
    //   Observable.combineLatest(
    //     this.us$,
    //     this.detailForm.controls['displayName'].valueChanges.debounceTime(this.DEBOUNCE_TIME).distinctUntilChanged(),
    //     this.photoURL$.startWith(undefined).debounceTime(this.DEBOUNCE_TIME).distinctUntilChanged(),
    //     (user, displayName, photoURL) => {
    //       return {
    //         user,
    //         update: {
    //           displayName: displayName ? displayName : user.displayName,
    //           photoURL: photoURL ? photoURL : user.photoURL
    //         }
    //       }
    //     })
    //     .flatMap(res => res.user.updateProfile(res.update))
    //     .do(() => this.openSnackBar('name updated'))
    //     .subscribe()

    //   Observable.combineLatest(
    //     this.us$,
    //     this.detailForm.controls['email'].valueChanges.debounceTime(2500).distinctUntilChanged(),
    //     (user, email) => {

    //       return {
    //         user,
    //         email
    //       }
    //     })
    //     .flatMap(res => res.user.updateEmail(res.email))
    //     .do(() => this.openSnackBar('email updated'))
    //     .subscribe(a => undefined, err => {
    //       if (err.code === '"auth/requires-recent-login"') {
    //         console.log('should re-auth')
    //       }
    //     })

    //   // this.detailForm.controls['displayName'].valueChanges.debounceTime(500).subscribe(name => {
    //   // })
    //   // this.detailForm.controls['phoneNumber'].valueChanges.debounceTime(500).subscribe(console.log)
    // }
  }

  openSnackBar(message: string, action = 'dismiss') {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  updateDetail() {
    this.auth
      .updateProfile(this.detailForm.value.displayName)
      .take(1)
      .subscribe(() => {
        this.openSnackBar('name updated')
      }, err => {
        console.log(err)
      })
  }

  updatePassword() {
    const permuteError = (err?: string) => {
      this.passwordError = err
      this.cd.markForCheck()
    }

    this.auth
      .updateEmailPassword(this.passForm.value.currentPassword, this.passForm.value.newPassword)
      .take(1)
      .subscribe(res => {
        permuteError()
        this.passForm.reset()
        // this.passwordPanel..close()
        this.openSnackBar('password updated')
      }, err => {
        permuteError(err.message)
      })
  }

  passwordError: string | undefined
}
