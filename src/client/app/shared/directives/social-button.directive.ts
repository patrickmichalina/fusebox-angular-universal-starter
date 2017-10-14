import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[pmSocialButton]'
})
export class SocialButtonDirective implements OnInit {
  @Input() pmSocialButton: string

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = this.getHover(this.pmSocialButton)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBaseSyles(this.pmSocialButton)
  }

  constructor(private elementRef: ElementRef) { }

  private map: { [key: string]: { bg: string, hover: string, border: string } } = {
    facebook: { bg: '#4267b2', hover: '#2d4373', border: '#29487d' },
    twitter: { bg: '#55acee', hover: '#2795e9', border: 'rgba(0, 0, 0, 0.2)' },
    github: { bg: '#444', hover: '#2b2b2b', border: 'rgba(0, 0, 0, 0.2)' },
    google: { bg: '#dd4b39', hover: '#c23321', border: 'rgba(0, 0, 0, 0.2)' }
  }

  ngOnInit() {
    this.setBaseSyles(this.pmSocialButton)
  }

  setBaseSyles(provider: string) {
    const val = this.map[provider] || {}
    this.elementRef.nativeElement.style.backgroundColor = val.bg
    this.elementRef.nativeElement.style.color = '#fff'
    this.elementRef.nativeElement.style['border-bottom'] = `1px solid ${val.border}`
  }

  getHover(provider: string) {
    const val = this.map[provider] || {}
    return val.hover
  }
}
