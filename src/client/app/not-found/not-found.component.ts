import { of } from 'rxjs/observable/of'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { ServerResponseService } from './../shared/services/server-response.service'
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'

@Component({
  selector: 'pm-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  public page$ = this.db.get(`/pages/${this.req.originalUrl}`)
    .map(res => {
      if (res) return res
      this.rs.setNotFound()
      return {
        content: 'not found'
      }
    })
    .catch(err => {
      if (err.code === 'PERMISSION_DENIED') {
        this.rs.setStatus(401)
        return of({
          content: 'unauthorized'
        })
      } else {
        this.rs.setError()
        return of({
          content: 'server error'
        })
      }
    })

  constructor(private rs: ServerResponseService, private db: FirebaseDatabaseService, @Inject(REQUEST) private req: any) {}
}
