import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material'
import { PageFormComponent } from './page-form/page-form.component'

@Component({
  selector: 'pm-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent {
  pages$ = this.db.get('/pages')

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
    const dialogRef = this.dialog.open(PageFormComponent, {
      width: '460px',
      position: {
        top: '30px'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

  constructor(private db: FirebaseDatabaseService, private dialog: MatDialog) { }
}
