import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentRef,
  Directive,
  Input,
  ModuleWithComponentFactories,
  NgModule,
  OnChanges,
  OnDestroy,
  ReflectiveInjector,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core'

import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared.module'

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
  const cmpClass = class DynamicComponent { }
  const decoratedCmp = Component(metadata)(cmpClass)

  @NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    declarations: [decoratedCmp]
  })
  class DynamicHtmlModule { }

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) =>
      moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp) as any)
}

@Directive({
  selector: '[pmHtmlOutlet]'
})
export class HtmlOutletDirective implements OnChanges, OnDestroy {
  @Input() html: string
  cmpRef: ComponentRef<any>

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = `<div class="ql-editor vert-flex-fill">${this.html}</div>`
    if (!html || typeof html !== 'string') return

    if (this.cmpRef) {
      this.cmpRef.destroy()
    }

    const compMetadata = new Component({
      selector: 'dynamic-html',
      template: html,
      host: {
        '[class.vert-flex-fill]': 'flex',
        '[class.ql-container]': 'cont',
        '[class.ql-snow]': 'cont2'
      },
      encapsulation: ViewEncapsulation.None
    })

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector)
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, [])
        this.cmpRef.instance.cont = true
        this.cmpRef.instance.cont2 = true
        this.cmpRef.instance.flex = true
      })
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy()
    }
  }
}
