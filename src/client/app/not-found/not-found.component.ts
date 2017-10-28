import { QuillEditorComponent } from './../shared/quill-editor/quill-editor.component'
import { ActivatedRoute, Router } from '@angular/router'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { AuthService } from './../shared/services/auth.service'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { FormControl, FormGroup, Validators } from '@angular/forms'
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

  private url$ = Observable.of(this.req.originalUrl || '')
    .map(a => a.split('?')[0])
    .filter(a => !a.includes('.')).shareReplay()

  public settingsForm = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    imgUrl: new FormControl('', [
      // Validators.required
    ])
  })

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
        this.settingsForm.controls['title'].setValue(page.title)
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

  view$ = Observable.combineLatest(this.auth.user$, this.page$, this.ar.queryParams.pluck('edit').map(a => a === 'true'),
    (user, page, isEditing) => {
      return {
        canEdit: true, // for demo only, user && user.roles && user.roles.admin,
        isEditing,
        page
      }
    })
    .catch(err => {
      this.rs.setError()
      return Observable.of({
        content: 'server error'
      })
    })

  publish() {
    this.url$.flatMap(url => this.db.getObjectRef(`/pages/${url}`).update({
      content: this.editor.textValue.getValue()
    }), (url, update) => ({ url, update }))
      .take(1)
      .subscribe(a => {
        this.router.navigate([a.url])
      })
  }

  delete() {
    this.url$.flatMap(url => this.db.getObjectRef(`/pages/${url}`).remove(), (url, update) => ({ url, update }))
      .take(1)
      .subscribe(a => {
        this.router.navigate(['/pages'])
      })
  }

  viewCurrent() {
    this.url$.do(url => {
      this.router.navigate([url])
    }).take(1).subscribe()
  }

  edit() {
    this.url$.do(url => {
      this.router.navigate([url], { queryParams: { edit: true } })
    }).take(1).subscribe()
  }

  constructor(private rs: ServerResponseService, private db: FirebaseDatabaseService, @Inject(REQUEST) private req: any,
    private seo: SEOService, private sanitizer: DomSanitizer, public auth: AuthService, private ar: ActivatedRoute,
    private router: Router) {
  }
}
