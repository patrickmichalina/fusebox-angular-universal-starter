import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-key-value-form',
  templateUrl: './key-value-form.component.html',
  styleUrls: ['./key-value-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyValueFormComponent implements OnChanges {
  @Input() readonly keyVals: { readonly [key: string]: string | boolean | number } = {}
  @Output() readonly onChange = new BehaviorSubject(this.keyVals)

  public form = new FormGroup({
    key: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes.keyVals) {
      this.onChange.next(changes.keyVals.currentValue)
    }
  }

  add(obj: { readonly key: string, readonly value: string }) {
    this.onChange.next({
      ...this.onChange.getValue(),
      [obj.key]: obj.value
    })
  }

  remove(key: string) {
    this.onChange.next({
      ...Object.keys(this.onChange.getValue())
        .filter(k => k !== key)
        .reduce((a, c) => ({ ...a, [c]: this.onChange.getValue()[c] }), {})
    })
  }
}
