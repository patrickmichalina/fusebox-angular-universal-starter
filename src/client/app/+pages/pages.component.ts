import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material'
import { PageFormComponent } from './page-form/page-form.component'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

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
    (currentTab, pages) => {
      return {
        pages,
        currentTab
      }
    })

  ds(key: string) {
    const self = this
    return {
      connect() {
        return self.db.get(`/pages/${key}`)
      },
      disconnect() {
        // void
      }
    }
  }

  openDialog() {
    this.dialog.open(PageFormComponent, {
      width: '460px',
      position: {
        top: '30px'
      }
    })
  }

  updateTabParam(tab: number) {
    this.router.navigate([this.router.url.split('?')[0]], { queryParams: { tab }, queryParamsHandling: 'merge' })
  }

  constructor(private db: FirebaseDatabaseService, private dialog: MatDialog, private ar: ActivatedRoute, private router: Router) { }
}
