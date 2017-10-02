import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Test1Component {
}
