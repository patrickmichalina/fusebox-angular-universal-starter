import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { Subject } from 'rxjs/Subject'
import { AuthService } from './../shared/services/auth.service'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { QuillEditorComponent } from './../shared/quill-editor/quill-editor.component'
import { ServerResponseService } from './../shared/services/server-response.service'
import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewChild } from '@angular/core'
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
  @HostBinding('class.vert-flex-fill') flexFill = true
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent

  private url$ = Observable.of(this.req.originalUrl || '').filter(a => !a.includes('.')).shareReplay()

  private editingSource = new Subject<boolean>()
  // private buffer = new BehaviorSubject<string>('')

  public page$ = this.url$
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

  view$ = Observable.combineLatest(this.auth.user$, this.page$, this.editingSource.asObservable().startWith(false),
    (user, page, isEditing) => {
      return {
        canEdit: user.roles.admin,
        isEditing,
        page
      }
    })

  updateBuffer(html: string) {
    console.log('buffer-update', html)
  }

  publish() {
    console.log('saving', this.editor.textValue.getValue())
    this.url$.flatMap(url => this.db.getObjectRef(`/pages/${url}`).update({
      content: this.editor.textValue.getValue()
    }))
      .take(1)
      .subscribe(a => {
        this.editingSource.next(false)
      })
  }

  edit() {
    this.editingSource.next(true)
  }

  constructor(private rs: ServerResponseService, private db: FirebaseDatabaseService, @Inject(REQUEST) private req: any,
    private seo: SEOService, private sanitizer: DomSanitizer, public auth: AuthService) {
  }
}
