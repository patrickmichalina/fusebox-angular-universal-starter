import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'

@Component({
  selector: 'pm-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  test$ = this.db.get('site-settings')

  constructor(private db: FirebaseDatabaseService) { }
}
