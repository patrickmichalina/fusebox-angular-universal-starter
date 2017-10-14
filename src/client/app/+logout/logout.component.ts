import { PlatformService } from './../shared/services/platform.service'
import { CookieService } from './../shared/services/cookie.service'
import { AngularFireAuth } from 'angularfire2/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent {
  constructor(afAuth: AngularFireAuth, cs: CookieService, ps: PlatformService) {
    cs.remove('fbJwt')
    cs.remove('fbPhotoURL')
    cs.remove('fbProviderId')
    cs.remove('fbEmail')
    cs.remove('fbDisplayName')
    if (ps.isBrowser) {
      afAuth.auth.signOut()
    }
  }
}
