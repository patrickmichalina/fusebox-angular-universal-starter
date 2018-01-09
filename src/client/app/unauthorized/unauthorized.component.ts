import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent {
}
