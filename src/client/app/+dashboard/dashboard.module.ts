import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardPageHeaderComponent } from './header/dashboard-page-header.component'
import { DashboardPageFooterComponent } from './footer/dashboard-page-footer.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MdIconModule, MdSidenavModule } from '@angular/material'

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, MdSidenavModule, MdIconModule],
  declarations: [DashboardComponent, DashboardPageHeaderComponent, DashboardPageFooterComponent],
  exports: [DashboardComponent, DashboardPageHeaderComponent, DashboardPageFooterComponent]
})
export class DashboardModule { }
