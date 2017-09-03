import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NavbarService } from './navbar.service'

@Component({
  selector: 'pm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  constructor(public navbarService: NavbarService) { }
}
