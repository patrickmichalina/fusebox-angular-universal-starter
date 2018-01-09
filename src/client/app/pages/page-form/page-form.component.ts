import { FirebaseDatabaseService } from '../../shared/services/firebase-database.service'
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material'
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component'

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
      Validators.required,
      // Validators.pattern(/^[^/A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
      Validators.pattern('^[^/]+/[^/]+$')
    ], this.validateSlugNotTaken.bind(this)),
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    isDraft: new FormControl(true, [])
  })

  // tslint:disable:no-null-keyword
  validateSlugNotTaken(control: AbstractControl) {
    return this.db
      .getObjectRef(`/pages/${control.value}`)
      .valueChanges()
      .debounceTime(200)
      .take(1)
      .map(a => a ? ({ slugTaken: true }) : null)
  }

  create() {
    this.db.getObjectRef(`/pages/${this.form.value.slug}`).update({
      title: this.form.value.title,
      description: this.form.value.description,
      isDraft: this.form.value.isDraft,
      userCommentsEnabled: false,
      cache: {
        'no-cache': true,
        'no-store': true,
        'must-revalidate': true
      }
    })
    .then(() => this.dialog.close(true))
    .catch(() => this.dialog.close(false))
  }

  constructor(private db: FirebaseDatabaseService, public dialog: MatDialogRef<ModalConfirmationComponent>) { }
}
