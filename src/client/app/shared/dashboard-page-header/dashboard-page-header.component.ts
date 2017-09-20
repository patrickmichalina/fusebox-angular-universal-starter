import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'pm-dashboard-page-header',
  templateUrl: './dashboard-page-header.component.html',
  styleUrls: ['./dashboard-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageHeaderComponent {
  
  @Input() title: string; 

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {

   }

   toggle(){
     this.toggleSidenav.emit(true);
   }
}
