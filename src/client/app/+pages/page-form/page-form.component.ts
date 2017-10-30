import { FirebaseDatabaseService } from './../../shared/services/firebase-database.service'
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageFormComponent {
  @Output() onCreated = new EventEmitter()

  public form = new FormGroup({
    slug: new FormControl('blog/', [
      Validators.required
      // Validators.pattern(EMAIL_REGEX)
    ]),
    title: new FormControl('', [
      Validators.required
      // Validators.pattern(EMAIL_REGEX)
    ])
  })

  create() {
    const key = this.form.value.slug
    this.db.getObjectRef(`/pages/${key}`).update({
      title: this.form.value.title,
      userCommentsEnabled: false,
      cache: {
        'no-cache': true,
        'no-store': true,
        'must-revalidate': true
      }
    })
  }

  constructor(private db: FirebaseDatabaseService) {}
}
