import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'

@Directive({
  selector: '[pmClickOutside]'
})
export class ClickOutsideDirective {
  @Input() exclude: string
  @Output() pmClickOutside = new EventEmitter<boolean>()

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: any): void {
    if (!targetElement) return

    const clickedInside = this.elementRef.nativeElement.contains(targetElement)
    const nodes = Array.from(document.querySelectorAll(this.exclude)) as Array<HTMLElement>
    const whitelisted = nodes.some(a => a.contains(targetElement))

    if (!clickedInside && !whitelisted) {
      this.pmClickOutside.emit(true)
    }
  }
}
