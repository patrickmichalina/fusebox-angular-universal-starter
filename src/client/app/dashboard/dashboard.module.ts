import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardPageHeaderComponent } from './header/dashboard-page-header.component'
import { DashboardPageFooterComponent } from './footer/dashboard-page-footer.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MatIconModule, MatSidenavModule } from '@angular/material'

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, MatSidenavModule, MatIconModule],
  declarations: [DashboardComponent, DashboardPageHeaderComponent, DashboardPageFooterComponent],
  exports: [DashboardComponent, DashboardPageHeaderComponent, DashboardPageFooterComponent]
})
export class DashboardModule { }
