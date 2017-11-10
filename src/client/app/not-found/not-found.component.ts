import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { DOMInjectable } from './../shared/services/injection.service'
import { ChangeDetectionStrategy, Component, HostBinding, ViewChild } from '@angular/core'
import { QuillEditorComponent } from './../shared/quill-editor/quill-editor.component'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { AuthService } from './../shared/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ServerResponseService } from './../shared/services/server-response.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { filter } from 'rxjs/operators'
import { SEONode, SEOService } from '../shared/services/seo.service'
import { MatChipInputEvent, MatDialog, MatSnackBar } from '@angular/material'
import { ModalConfirmationComponent } from '../shared/modal-confirmation/modal-confirmation.component'
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

type types = 'script' | 'style'
interface InjectionMap { [key: string]: { type: types, injectable: DOMInjectable } }

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
  injections$ = new BehaviorSubject<InjectionMap>({})
  injectionsToSave$ = new BehaviorSubject<InjectionMap>({})
  styleInjDefault = {
    element: 'link',
    attributes: {
      href: 'https://',
      type: 'text/css',
      rel: 'stylesheet'
    }
  }

  cacheSettings = {} as any

  injectionFormChange(key: string, type: types, injectable: DOMInjectable) {
    console.log(key)
    // this.injectionsToSave$.next({
    //   ...this.injections$.getValue(),
    //   [key]: {
    //     type,
    //     injectable
    //   }
    // })
  }

  addInjectable(type: types) {
    this.injections$.next({
      ...this.injections$.getValue(),
      [`${type.toString()}_${Math.random().toPrecision(4)}`]: {
        type,
        injectable: {} as any
      }
    })
  }

  insertInjectable(key: string, type: types, injectable: DOMInjectable) {
    this.injections$.next({
      ...this.injections$.getValue(),
      [key]: {
        type,
        injectable
      }
    })
  }

  removeInjectable(key: string) {
    const current = this.injections$.getValue()
    this.injections$.next({
      ...Object.keys(current)
        .filter(k => k !== key)
        .reduce((a, c) => ({ ...a, [c]: current[c] }), {})
    })
  }

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
    .pipe(filter(a => !a.includes('.')))
    .shareReplay()

  public settingsForm = new FormGroup({
    type: new FormControl('website', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.max(158)]),
    imgUrl: new FormControl('', []),
    imgAlt: new FormControl('', []),
    imgMime: new FormControl('', []),
    imgHeight: new FormControl('', [Validators.min(1)]),
    imgWidth: new FormControl('', [Validators.min(1)]),
    articlePublishedTime: new FormControl(new Date(), []),
    articleModifiedTime: new FormControl('', []),
    articleExpirationTime: new FormControl('', []),
    articleAuthor: new FormControl('', []),
    articleSection: new FormControl('', []),
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
                  : `${curr}=${pageCacheSettings[curr]}`

                return acc.concat(', ').concat(ret)
              }, '')
              .replace(/(^,)|(,$)/g, '')
              .trim()

            if (cacheControl) {
              this.rs.setHeader('Cache-Control', cacheControl)
            } else {
              this.rs.setCacheNone()
            }
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
        this.cacheSettings = page.cache
        this.seo.updateNode({
          title: page.title,
          description: page.description,
          img: {
            width: page.imgWidth,
            height: page.imgHeight,
            type: page.imgMime,
            alt: page.imgAlt,
            url: page.imgUrl
          },
          tags: page.articleTag
        })

        // tslint:disable:no-null-keyword
        const formValues = Object.keys(this.settingsForm.controls)
          .reduce((acc: any, controlKey) =>
            ({ ...acc, [controlKey]: (page as any)[controlKey] || this.settingsForm.controls[controlKey].value || null }), {})
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
    const injections = this.injectionsToSave$.getValue()
    const cache = this.cacheSettings

    const settings = Object.keys(this.settingsForm.value)
      .filter(key => typeof this.settingsForm.value[key] !== 'undefined')
      .reduce((acc, curr) => ({ ...acc, [curr]: this.settingsForm.value[curr] }) as any, {})

    this.url$.flatMap(url => this.db.getObjectRef(`/pages/${url}`)
      .update({
        ...settings,
        injections,
        cache,
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
    this.url$
      .take(1)
      .subscribe(url => this.router.navigate([url]))
  }

  edit() {
    this.url$
      .take(1)
      .subscribe(url => this.router.navigate([url], { queryParams: { edit: true } }))
  }

  constructor(private rs: ServerResponseService, private db: FirebaseDatabaseService, private seo: SEOService,
    public auth: AuthService, private ar: ActivatedRoute, private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  updateCache(cache: any) {
    this.cacheSettings = cache
  }
}
