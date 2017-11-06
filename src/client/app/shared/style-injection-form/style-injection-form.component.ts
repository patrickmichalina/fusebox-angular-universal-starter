import { FormControl } from '@angular/forms'
import { ChangeDetectionStrategy, Component } from '@angular/core'
// import { InjectionFormComponent } from '../injection-form/injection-form.component'

@Component({
  selector: 'pm-style-injection-form',
  templateUrl: './style-injection-form.component.html',
  styleUrls: ['./style-injection-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleInjectionFormComponent {
  isInline = new FormControl(true)

  constructor() {
    // super()
    // this.form.addControl('linkHref', new FormControl('', []))
    // this.form.controls['element'].setValue('link')
    // this.isInline.valueChanges.subscribe(inline => {
    //   if (inline) {
    //     this.form.controls['element'].setValue('style')
    //     this.form.controls['linkHref'].setValidators([])
    //     this.form.controls['linkHref'].setValue(undefined)
    //     this.form.controls['attributes'].setValue(undefined)
    //   } else {
    //     this.form.controls['linkHref'].setValidators([Validators.required])
    //     this.form.controls['element'].setValue('link')
    //     this.form.controls['attributes'].setValue({
    //       ...this.form.controls['attributes'].value,
    //       rel: 'stylesheet',
    //       type: 'text/css',
    //       href: ''
    //     })
    //   }
    // })
  }
}
