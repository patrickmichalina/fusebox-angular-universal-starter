import { Subject } from 'rxjs/Subject'
import { TransferState } from '@angular/platform-browser'
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { AUTH_TS_KEY } from '../app.module'

@Component({
  selector: 'pm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  @HostBinding('class.card-float-container') containerClass = true

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

  constructor(private afAuth: AngularFireAuth, private ts: TransferState) {
    const authFromServer = this.ts.get(AUTH_TS_KEY, {})
    this.userSource.next(authFromServer)
    this.afAuth.idToken.subscribe(a => {
      console.log(a)
      // emailVerified
      this.userSource.next(a)
    })
  }
}
