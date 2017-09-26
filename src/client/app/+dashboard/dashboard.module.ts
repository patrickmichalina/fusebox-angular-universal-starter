import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
// import { DashboardPageHeaderComponent } from './dashboard-page-header/dashboard-page-header.component'
// import { DashboardPageFooterComponent } from './dashboard-page-footer/dashboard-page-footer.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MdIconModule, MdSidenavModule } from '@angular/material'

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, MdSidenavModule, MdIconModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
