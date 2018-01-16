import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'pm-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmationComponent {
  @Input() readonly message: string
  @Input() readonly title: string

  constructor(public dialog: MatDialogRef<ModalConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  readonly view = {
    message: this.data.message || this.message,
    title: this.data.title || this.title
  }
}
