import { PlatformService } from './../shared/services/platform.service'
import { Subject } from 'rxjs/Subject'
import { TransferState } from '@angular/platform-browser'
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { AUTH_TS_KEY } from '../app.module'
import { MatSnackBar } from '@angular/material'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  @HostBinding('class.card-float-container') containerClass = true
  public form = new FormGroup({
    displayName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.required
    ])
  })
  private userSource = new Subject()
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
    this.afAuth.idToken.subscribe(a => {
      this.userSource.next(a)
    })

    if (ps.isBrowser) {
      this.form.controls['displayName'].valueChanges.debounceTime(500).subscribe(console.log)
      this.form.controls['phoneNumber'].valueChanges.debounceTime(500).subscribe(console.log)
      this.form.controls['email'].valueChanges.debounceTime(500).subscribe(console.log)
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }
}
