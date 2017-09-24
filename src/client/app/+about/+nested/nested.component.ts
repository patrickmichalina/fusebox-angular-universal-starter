import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-nested',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedComponent {
}
