import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBoxComponent {
}
