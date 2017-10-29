import { QuillEditorComponent } from './../shared/quill-editor/quill-editor.component'
import { ActivatedRoute, Router } from '@angular/router'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { AuthService } from './../shared/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ServerResponseService } from './../shared/services/server-response.service'
import { ChangeDetectionStrategy, Component, HostBinding, ViewChild } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { SEONode, SEOService } from '../shared/services/seo.service'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ModalConfirmationComponent } from '../shared/modal-confirmation/modal-confirmation.component'

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

  private url$ = Observable.of(this.router.url.split('?')[0])
    .filter(a => !a.includes('.'))
    .shareReplay()

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
          return {
            ...res,
            content: res.content
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
        this.snackBar.open('Published! Page is now live.', 'dismiss', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      })
  }

  confirmDelete() {
    return this.dialog.open(ModalConfirmationComponent, {
      width: '460px',
      position: {
        top: '30px'
      },
      data: {
        message: 'Deleting this page will immediately remove it from the database and anyone reading it',
        title: 'Are you sure?'
      }
    })
  }

  delete() {
    this.confirmDelete()
      .afterClosed()
      .filter(Boolean)
      .flatMap(() => this.url$)
      .flatMap(url => this.db.getObjectRef(`/pages/${url}`).remove(), (url, update) => ({ url, update }))
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

  constructor(private rs: ServerResponseService, private db: FirebaseDatabaseService, private seo: SEOService,
    public auth: AuthService, private ar: ActivatedRoute, private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }
}
