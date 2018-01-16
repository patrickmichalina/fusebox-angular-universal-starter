import { PlatformService } from './../shared/services/platform.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  readonly posts$ = this.db.getList<{ readonly title: string, readonly html: string }>('posts').map(a => {
    return a.map((b: any) => {
      return {
        title: b.title || '',
        html: b.html || ''
      }
    })
  })

  public readonly form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    html: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private db: FirebaseDatabaseService, ps: PlatformService) { }

  create() {
    this.db.getListRef('posts').push(this.form.value)
  }

  removeAll() {
    this.db.getObjectRef('posts').remove()
  }

  trackByPost(index: number, item: any) {
    return index
  }
}
