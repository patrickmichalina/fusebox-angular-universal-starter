import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-injection-form',
  templateUrl: './injection-form.component.html',
  styleUrls: ['./injection-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjectionFormComponent {
  @Output() onChange = new EventEmitter<any>()
  // tslint:disable:no-null-keyword
  public form = new FormGroup({
    element: new FormControl('', [Validators.required]),
    inHead: new FormControl(false, []),
    value: new FormControl(null, []),
    attributes: new FormControl(null, [])
  })

  constructor() {
    this.form.valueChanges.subscribe(console.log)
  }
}
