import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog, MatTableDataSource } from '@angular/material'
import { PageFormComponent } from './page-form/page-form.component'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { ModalConfirmationComponent } from '../shared/modal-confirmation/modal-confirmation.component'

@Component({
  selector: 'pm-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent {
  pages$ = this.db.get('/pages')

  private params$ = this.ar.queryParams.shareReplay()
  private currentTab$ = this.params$
    .map(a => a.tab ? +a.tab : 0)

  view$ = Observable.combineLatest(this.currentTab$, this.pages$,
    (currentTab, pages: { [key: string]: string }) => {
      return {
        groups: Object.keys(pages || {}).map(group => {
          return {
            table: new MatTableDataSource(Object.keys(pages[group] || {}).map(slug => {
              return {
                ...(pages[group] as any)[slug],
                slug,
                routerLink: `/${group}/${slug}`
              }
            })),
            name: group
          }
        }),
        currentTab
      }
    })

  displayedColumns = ['slug', 'edit']

  openDialog() {
    this.dialog.open(PageFormComponent, {
      width: '460px',
      position: {
        top: '30px'
      }
    })
  }

  confirmDelete() {
    return this.dialog.open(ModalConfirmationComponent, {
      width: '460px',
      position: {
        top: '30px'
      },
      data: {
        message: 'Deleting this page will immediately remove it from the database',
        title: 'Are you sure?'
      }
    })
  }

  delete(group: string, slug: string) {
    this.confirmDelete()
      .afterClosed()
      .filter(Boolean)
      .flatMap(() => this.db
        .getObjectRef(`/pages/${group}/${slug}`)
        .remove())
      .take(1)
      .subscribe(succ => {
        // todo
      }, err => {
        // todo
      })
  }

  updateTabParam(tab: number) {
    this.router.navigate([this.router.url.split('?')[0]], { queryParams: { tab }, queryParamsHandling: 'merge' })
  }

  constructor(private db: FirebaseDatabaseService, private dialog: MatDialog, private ar: ActivatedRoute, private router: Router) { }
}
