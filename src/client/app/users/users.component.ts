import { Observable } from 'rxjs/Observable'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { SettingService } from '../shared/services/setting.service'
// import { PageEvent } from '@angular/material'

@Component({
  selector: 'pm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  public usersFromDb$ = this.db
    .getListKeyed('users', ref => ref.limitToFirst(5000)) // TODO: pagination

  public users$ = Observable.combineLatest(this.usersFromDb$, this.ss.settings$,
    (userInfo, settings) => {
      return userInfo.map((user: any) => {
        return {
          ...user,
          photo: user.photo || settings.assets.userAvatarImage
        }
      })
    })

  constructor(private db: FirebaseDatabaseService, private ss: SettingService) { }

  // pageEvent(pageEvent: PageEvent) {
  //   console.log(pageEvent)
  // }
}
