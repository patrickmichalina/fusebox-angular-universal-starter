import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-test-child-2',
  templateUrl: './testChild1.component.html',
  styleUrls: ['./testChild1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestChild1Component {
}
