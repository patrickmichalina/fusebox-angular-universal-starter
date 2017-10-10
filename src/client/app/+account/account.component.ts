import { AUTH_TS_KEY } from '../app.module'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { TransferState } from '@angular/platform-browser'
import { ChangeDetectionStrategy, Component, HostBinding, ViewChild, ViewContainerRef } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { PlatformService } from './../shared/services/platform.service'
import { MatSnackBar } from '@angular/material'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import * as firebase from 'firebase/app'

@Component({
  selector: 'pm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  @HostBinding('class.card-float-container') containerClass = true
  private DEBOUNCE_TIME = 750
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
  private userSource = new Subject()
  private photoURL$ = new Subject<string>()
  public us$ = this.afAuth.idToken
  public user$ = this.userSource
    .startWith(this.ts.get(AUTH_TS_KEY, {}))
    .map(a => {
      const emailVerified = (a as any).emailVerified
      return {
        ...a,
        emailColor: emailVerified ? 'primary' : 'accent',
        emailIcon: emailVerified ? 'fa-check-circle' : 'fa-question-circle',
        emailTooltip: emailVerified ? 'confirmed email' : 'unconfirmed email'
      }
    })

  constructor(private afAuth: AngularFireAuth, private ts: TransferState, private snackBar: MatSnackBar, ps: PlatformService) {
    const authFromServer = this.ts.get(AUTH_TS_KEY, {})
    this.userSource.next(authFromServer)
    // this.afAuth.idToken.subscribe(a => {
    //   this.userSource.next(a)
    // })

    if (ps.isBrowser) {
      Observable.combineLatest(
        this.us$,
        this.detailForm.controls['displayName'].valueChanges.debounceTime(this.DEBOUNCE_TIME).distinctUntilChanged(),
        this.photoURL$.startWith(undefined).debounceTime(this.DEBOUNCE_TIME).distinctUntilChanged(),
        (user, displayName, photoURL) => {
          return {
            user,
            update: {
              displayName: displayName ? displayName : user.displayName,
              photoURL: photoURL ? photoURL : user.photoURL
            }
          }
        })
        .flatMap(res => res.user.updateProfile(res.update))
        .do(() => this.openSnackBar('name updated'))
        .subscribe()

      Observable.combineLatest(
        this.us$,
        this.detailForm.controls['email'].valueChanges.debounceTime(2500).distinctUntilChanged(),
        (user, email) => {

          return {
            user,
            email
          }
        })
        .flatMap(res => res.user.updateEmail(res.email))
        .do(() => this.openSnackBar('email updated'))
        .subscribe(a => undefined, err => {
          if (err.code === '"auth/requires-recent-login"') {
            console.log('should re-auth')
          }
        })

      // this.detailForm.controls['displayName'].valueChanges.debounceTime(500).subscribe(name => {
      // })
      // this.detailForm.controls['phoneNumber'].valueChanges.debounceTime(500).subscribe(console.log)
    }
  }

  openSnackBar(message: string, action = 'dismiss') {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  updateDetail() {
    // this.us$.flatMap(user => user.update(this.passForm.value.newPassword))
    //   .take(1)
    //   .subscribe(user => {
    //     user
    //     console.log(user)
    //   })
  }

  updatePassword() {
    this.us$.flatMap(user => {
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email as string, this.passForm.value.currentPassword)
      return user.reauthenticateWithCredential(credentials)
    }, (user, res) => user)
      .flatMap(user => user.updatePassword(this.passForm.value.newPassword))
      .take(1)
      .subscribe(
      () => {
        this.openSnackBar('password updated')
      },
      console.log
      )
  }
}
