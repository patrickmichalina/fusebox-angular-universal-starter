import { Title } from '@angular/platform-browser'
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { DASHBOARD_MENU } from './dashboard-menu'

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  pageTitle: string

  isMobile = false

  dashboardMenu: any = DASHBOARD_MENU

  @ViewChild('sidenav') public sidenav: MatSidenav

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 840) {
      this.sidenav.close()
    }
    if (event.target.innerWidth >= 840) {
      this.sidenav.open()
    }
  }

  constructor(private title: Title) {
  }

  ngOnInit() {
    const title = this.title.getTitle()
    this.setPageTitle(title.substr(0, title.indexOf('-')))
  }

  toggleSidenav(event: any) {
    this.sidenav.toggle()
  }

  setPageTitle(title: string) {
    this.pageTitle = title
  }

}
