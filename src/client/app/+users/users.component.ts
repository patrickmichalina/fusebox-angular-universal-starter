import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'

@Component({
  selector: 'pm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  public users$ = this.db
    .getListRef('users', ref => ref.limitToFirst(3))
    .snapshotChanges()
    // .map(a => {
    //   return {
    //     id: a.key,
    //     // ...a.payload.val()
    //   }
    // })
    .do(console.log, console.error)

  constructor(private db: FirebaseDatabaseService) {
    // this.db.getListRef('users', ref => ref.limitToFirst(3))
    //   .snapshotChanges()
    //   .subscribe(console.log, console.error)
  }
}
