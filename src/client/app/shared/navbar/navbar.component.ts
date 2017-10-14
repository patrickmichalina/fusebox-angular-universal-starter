import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { NavbarService } from './navbar.service'

export interface User {
  photoURL: string
  email: string
  name: string
}

@Component({
  selector: 'pm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @HostListener('click', ['$event.target']) clicked() {
    this.onClicked.next()
  }
  @Output() onMenuIconClick = new EventEmitter()
  @Output() onClicked = new EventEmitter()
  @Input() user: User

  constructor(public navbarService: NavbarService) { }
}
