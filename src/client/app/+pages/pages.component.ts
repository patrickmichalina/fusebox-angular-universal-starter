import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent {
  pages$ = this.db.get('/pages')

  constructor(private db: FirebaseDatabaseService) { }
}
