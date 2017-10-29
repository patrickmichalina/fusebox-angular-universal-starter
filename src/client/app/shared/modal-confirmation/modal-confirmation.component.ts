import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'pm-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmationComponent {
  constructor(ref: MatDialogRef<ModalConfirmationComponent>) {
    // void
  }
}
