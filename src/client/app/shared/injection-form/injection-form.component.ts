import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DOMInjectable, InjectionService } from '../services/injection.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'pm-injection-form',
  templateUrl: './injection-form.component.html',
  styleUrls: ['./injection-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjectionFormComponent implements OnInit, OnDestroy {
  @Input() showDomString: boolean
  @Input() injectable: DOMInjectable = {} as any
  @Output() onChange = new BehaviorSubject<DOMInjectable>(this.injectable)
  @Output() onChangeHtmlString = new EventEmitter<string>()

  public form: FormGroup
  private sub = new Subscription()

  get htmlString() {
    return this.inj.getElementStringForm(this.renderer, this.onChange.getValue())
  }

  constructor(private renderer: Renderer2, private inj: InjectionService) { }

  ngOnInit() {
    this.form = new FormGroup({
      element: new FormControl(this.injectable.element, [Validators.required]),
      inHead: new FormControl(this.injectable.inHead || false, []),
      value: new FormControl(this.injectable.value || undefined, []),
      attributes: new FormControl(this.injectable.attributes || {}, [])
    })
    this.sub = this.form.valueChanges.skip(1).subscribe(form => {
      this.onChange.next(form)
      this.onChangeHtmlString.next(this.htmlString)
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  attributesChanged(attrs: any) {
    if (this.form && this.form.controls) this.form.controls['attributes'].setValue(attrs || {})
  }
}
