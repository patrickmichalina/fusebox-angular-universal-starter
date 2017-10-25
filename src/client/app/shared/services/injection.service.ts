import { DOCUMENT } from '@angular/platform-browser'
import { Inject, Injectable, Renderer2 } from '@angular/core'
import { sha1 } from 'object-hash'

export interface DOMInjectable {
  inHead: boolean
  element: string
  value?: string
  attributes?: { [key: string]: string | boolean }
}

@Injectable()
export class InjectionService {
  constructor(@Inject(DOCUMENT) private doc: any) {}

  inject(renderer: Renderer2, injectable: DOMInjectable) {
    const st = renderer.createElement(injectable.element) as HTMLElement
    const id = sha1(JSON.stringify(injectable))

    if (this.doc.getElementById(id)) return

    renderer.setProperty(st, 'id', id)
    if (injectable.value) renderer.setValue(st, injectable.value)

    Object.keys(injectable.attributes || {})
      .forEach(key => renderer.setAttribute(st, key, (injectable.attributes || {})[key] as any))

    injectable.inHead
      ? renderer.appendChild(this.doc.head, st)
      : renderer.appendChild(this.doc.body, st)
  }

  injectCollection(renderer: Renderer2, injectables: DOMInjectable[]) {
    injectables.forEach(injectable => this.inject(renderer, injectable))
  }
}
