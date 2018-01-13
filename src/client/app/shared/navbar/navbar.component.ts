import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { NavbarService } from './navbar.service'

export interface User {
  readonly photoURL: string
  readonly email: string
  readonly name: string
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
  @Output() readonly onMenuIconClick = new EventEmitter()
  @Output() readonly onClicked = new EventEmitter()
  @Input() readonly user: User

  constructor(public navbarService: NavbarService) { }
}
