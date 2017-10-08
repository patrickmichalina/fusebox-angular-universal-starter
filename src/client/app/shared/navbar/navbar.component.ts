import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { NavbarService } from './navbar.service'

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
  @Input() user: {
    name: string
    pictureURL: string
    loggedIn: boolean
  }

  constructor(public navbarService: NavbarService) { }
}
