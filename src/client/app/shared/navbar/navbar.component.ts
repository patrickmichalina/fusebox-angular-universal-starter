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
  @HostListener('click', ['$event.target']) click() {
    this.clicked.next()
  }
  @Output() menuIconClick = new EventEmitter()
  @Output() clicked = new EventEmitter()
  @Input() user: User

  constructor(public navbarService: NavbarService) { }

  trackByFn(index: number, item: any) {
    return item.route
  }
}
