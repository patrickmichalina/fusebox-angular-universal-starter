import { ChangeDetectionStrategy, Component, HostBinding, ViewChild } from '@angular/core'
import { QuillEditorComponent } from './../shared/quill-editor/quill-editor.component'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { AuthService } from './../shared/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ServerResponseService } from './../shared/services/server-response.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { SEONode, SEOService } from '../shared/services/seo.service'
import { MatChipInputEvent, MatDialog, MatSnackBar } from '@angular/material'
import { ModalConfirmationComponent } from '../shared/modal-confirmation/modal-confirmation.component'
// tslint:disable-next-line:no-require-imports
import ms = require('ms')
import { ENTER } from '@angular/cdk/keycodes'

const COMMA = 188

export interface Page {
  content: string
  title: string
  isDraft: boolean
  userCommentsEnabled?: boolean
  cache?: { [key: string]: boolean | string | number }
  imgWidth?: number,
  imgHeight?: number,
  imgAlt?: string,
  imgUrl?: string,
  imgMime?: string
  articleTag?: string[]
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

  addOnBlur = true
  separatorKeysCodes = [ENTER, COMMA]
  tags: string[] = []

  add(event: MatChipInputEvent): void {
    if (event.input) event.input.value = '' // clear input value
    this.tags = [...this.tags, event.value.trim()]
      .filter(a => a !== '')
      .filter((elem, pos, arr) => arr.indexOf(elem) === pos)
    this.updateTags()
  }

  remove(tag: any): void {
    this.tags = [...this.tags].filter(a => a !== tag)
    this.updateTags()
  }

  updateTags() {
    this.settingsForm.controls['articleTag'].setValue(this.tags)
  }

  updateTabParam(tab: number) {
    this.router.navigate([this.router.url.split('?')[0]], { queryParams: { tab }, queryParamsHandling: 'merge' })
  }

  private params$ = this.ar.queryParams.shareReplay()

  private isEditMode$ = this.params$
    .map(a => a.edit ? true : false)

  private currentTab$ = this.params$
    .map(a => a.tab ? +a.tab : 0)

  private url$ = Observable.of(this.router.url.split('?')[0])
    .filter(a => !a.includes('.'))
    .shareReplay()

  public settingsForm = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.max(158)
    ]),
    imgUrl: new FormControl('', [
      // Validators.required
    ]),
    imgAlt: new FormControl('', [
      // Validators.min(1)
    ]),
    imgMime: new FormControl('', [
      // Validators.min(1)
    ]),
    imgHeight: new FormControl('', [
      Validators.min(1)
    ]),
    imgWidth: new FormControl('', [
      Validators.min(1)
    ]),
    articlePublishedTime: new FormControl(new Date(), [
      // Validators.min(1)
    ]),
    articleModifiedTime: new FormControl('', [
      // Validators.min(1)
    ]),
    articleExpirationTime: new FormControl('', [
      // Validators.min(1)
    ]),
    articleAuthor: new FormControl('', [
      // Validators.min(1)
    ]),
    articleSection: new FormControl('', [
      // Validators.min(1)
    ]),
    articleTag: new FormControl('', []),
    userCommentsEnabled: new FormControl('', []),
    isDraft: new FormControl('', [])
  })

  public page$ = this.url$
    .flatMap(url => this.db
      .get<Page & SEONode>(`/pages/${url}`)
      .flatMap(page => this.isEditMode$, (page, editMode) => ({ page, editMode }))
      .map(res => {
        if (res && res.page && (res.editMode || !res.page.isDraft)) {
          if (!res.editMode) {
            const pageCacheSettings = res.page.cache || {}
            const cacheControl = Object.keys(pageCacheSettings)
              .filter(key => pageCacheSettings[key])
              .reduce((acc, curr) => {
                const ret = typeof pageCacheSettings[curr] === 'boolean'
                  ? curr
                  : typeof pageCacheSettings[curr] === 'string'
                    ? `${curr}=${ms(pageCacheSettings[curr] as string) / 1000}`
                    : `${curr}=${pageCacheSettings[curr]}`

                return acc.concat(', ').concat(ret)
              }, '')
              .replace(/(^,)|(,$)/g, '')
              .trim()

            cacheControl
              ? this.rs.setHeader('Cache-Control', cacheControl)
              : this.rs.setCacheNone()
          } else {
            this.rs.setCacheNone()
          }

          return {
            ...res.page,
            content: res.page.content
          }
        }
        this.rs.setNotFound()
        this.rs.setCacheNone()
        return {
          ...res.page,
          content: 'not found'
        } as Page & SEONode
      })
      .do(page => {
        this.seo.updateNode({
          title: page.title,
          description: page.description,
          img: {
            width: page.imgWidth,
            height: page.imgHeight,
            type: page.imgMime,
            alt: page.imgAlt,
            url: page.url
          },
          tags: page.articleTag
        })

        // tslint:disable:no-null-keyword
        const formValues = Object.keys(this.settingsForm.controls).reduce((acc: any, controlKey) => {
          acc[controlKey] = (page as any)[controlKey] || null
          return acc
        }, {})

        this.settingsForm.setValue(formValues)
        this.tags = page.articleTag || []
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
            content: err || 'server error'
          })
        }
      }))

  view$ = Observable.combineLatest(this.auth.user$, this.page$, this.currentTab$,
    this.ar.queryParams.pluck('edit').map(a => a === 'true'),
    (user, page, currentTab, isEditing) => {
      return {
        currentTab,
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
    const settings = Object.keys(this.settingsForm.value)
      .filter(key => typeof this.settingsForm.value[key] !== 'undefined')
      .reduce((acc, curr) => {
        const obj = { ...acc } as any
        obj[curr] = this.settingsForm.value[curr]
        return obj
      }, {})

    this.url$.flatMap(url => this.db.getObjectRef(`/pages/${url}`)
      .update({
        ...settings,
        content: this.editor.textValue.getValue()
      }), (url, update) => ({ url, update }))
      .take(1)
      .subscribe(a => {
        this.router.navigate([a.url])
        this.showSnack('Published! Page is now live.')
      })
  }

  showSnack(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
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
        this.showSnack('Page removed!')
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
