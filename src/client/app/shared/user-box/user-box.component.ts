import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'

@Component({
  selector: 'pm-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBoxComponent {
  private _imageUrl: string | SafeStyle | undefined
  @Input() set imageUrl(val: string | SafeStyle | undefined) {
    this._imageUrl = val
  }
  get imageUrl(): string | SafeStyle | undefined {
    if (!this._imageUrl) return undefined as any
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this._imageUrl})`)
  }
  @Input() name: string
  @Input() isLoggedIn: boolean
  @HostListener('click', ['$event.target']) clicked() {
    this.onClicked.next()
  }
  @Output() onClicked = new EventEmitter()

  constructor(private sanitizer: DomSanitizer) {}
}
