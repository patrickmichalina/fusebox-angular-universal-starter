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
  @Input() keyVals: { [key: string]: string | boolean | number } = {}
  @Output() change = new BehaviorSubject(this.keyVals)

  public form = new FormGroup({
    key: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes.keyVals) {
      this.change.next(changes.keyVals.currentValue)
    }
  }

  add(obj: { key: string, value: string }) {
    this.change.next({
      ...this.change.getValue(),
      [obj.key]: obj.value
    })
  }

  remove(key: string) {
    this.change.next({
      ...Object.keys(this.change.getValue())
        .filter(k => k !== key)
        .reduce((a, c) => ({ ...a, [c]: this.change.getValue()[c] }), {})
    })
  }

  trackByFn(index: number, item: any) {
    console.log(item)
    return index
  }
}
