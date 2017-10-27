import { REQUEST } from '@nguniversal/express-engine/tokens'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { ServerResponseService } from './../shared/services/server-response.service'
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { SEONode, SEOService } from '../shared/services/seo.service'
import { DomSanitizer } from '@angular/platform-browser'

export interface Page {
  content: string
  title: string
}

@Component({
  selector: 'pm-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  public page$ = Observable.of(this.req.originalUrl || '').filter(a => !a.includes('.'))
    .flatMap(url => this.db
      .get<Page & SEONode>(`/pages/${url}`)
      .map(res => {
        if (res) {
          const safeHtml = this.sanitizer.bypassSecurityTrustHtml(res.content) as any
          return {
            ...res,
            content: safeHtml.changingThisBreaksApplicationSecurity
          }
        }
        this.rs.setNotFound()
        return {
          ...res,
          content: 'not found'
        } as Page & SEONode
      })
      .do(page => {
        this.seo.updateNode({
          title: page.title,
          description: page.description,
          imageUrl: page.imageUrl
        })
      })
      .catch(err => {
        if (err.code === 'PERMISSION_DENIED') {
          this.rs.setStatus(401)
          return Observable.of({
            content: 'unauthorized'
          })
        } else {
          this.rs.setError()
          return Observable.of({
            content: 'server error'
          })
        }
      }))

  constructor(private rs: ServerResponseService, private db: FirebaseDatabaseService, @Inject(REQUEST) private req: any,
    private seo: SEOService, private sanitizer: DomSanitizer) {
  }
}
