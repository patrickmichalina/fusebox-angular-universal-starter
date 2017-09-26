import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-test-child-1',
  templateUrl: './testChild.component.html',
  styleUrls: ['./testChild.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestChildComponent {
}
