import { AuthService } from './../shared/services/auth.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'pm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  public user$ = this.auth.userIdentity$.share()

  constructor(private auth: AuthService, private afAuth: AngularFireAuth) {
    this.afAuth.idToken.take(1).subscribe(a => {
      a.updateProfile({
        displayName: 'asdasdasd',
        // tslint:disable-next-line:max-line-length
        photoURL: 'https://somefile.com'
      }).then(console.log)
    })
  }
}
