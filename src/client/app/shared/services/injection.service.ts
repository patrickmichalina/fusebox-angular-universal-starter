import { Injectable, Renderer2 } from '@angular/core'
import { sha1 } from 'object-hash'

export interface DOMInjectable {
  inHead: boolean
  element: string
  value?: string
  attributes?: { [key: string]: string | boolean }
}

@Injectable()
export class InjectionService {
  inject(doc: HTMLDocument, renderer: Renderer2, injectable: DOMInjectable) {
    const st = renderer.createElement(injectable.element) as HTMLElement
    const id = sha1(JSON.stringify(injectable))

    if (doc.getElementById(id)) return

    renderer.setProperty(st, 'id', id)
    if (injectable.value) renderer.setValue(st, injectable.value)

    Object.keys(injectable.attributes || {})
      .forEach(key => renderer.setAttribute(st, key, (injectable.attributes || {})[key] as any))

    injectable.inHead
      ? renderer.appendChild(doc.head, st)
      : renderer.appendChild(doc.body, st)
  }

  injectCollection(doc: HTMLDocument, renderer: Renderer2, injectables: DOMInjectable[]) {
    injectables.forEach(injectable => this.inject(doc, renderer, injectable))
  }
}
