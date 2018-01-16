import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'pm-dashboard-page-header',
  templateUrl: './dashboard-page-header.component.html',
  styleUrls: ['./dashboard-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageHeaderComponent {

  @Input() readonly title: string

  @Output() readonly toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>()

  toggle() {
    this.toggleSidenav.emit(true)
  }
}
