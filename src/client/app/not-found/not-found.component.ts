import { ServerResponseService } from './../shared/services/server-response.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  constructor(responseService: ServerResponseService) {
    responseService.setStatus(404)
  }
}
