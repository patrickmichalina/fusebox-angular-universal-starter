import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

@Component({
  selector: 'pm-email-signup-card',
  templateUrl: './email-signup-card.component.html',
  styleUrls: ['./email-signup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSignupCardComponent {
  public form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]),
    password: new FormControl('', [
      Validators.required
    ])
  })
}
