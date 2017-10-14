import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[pmClickOutside]'
})
export class ClickOutsideDirective {
  @Output()
  public pmClickOutside = new EventEmitter<MouseEvent>()

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: any, targetElement: any): void {
    if (!targetElement) return

    const clickedInside = this.elementRef.nativeElement.contains(targetElement)
    if (!clickedInside) {
      this.pmClickOutside.emit(event)
    }
  }
}
