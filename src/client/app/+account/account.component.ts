import { AuthService } from './../shared/services/auth.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  public user$ = this.auth.userIdentity$.share()

  constructor(private auth: AuthService) {}
}
