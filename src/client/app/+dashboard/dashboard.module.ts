import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MdSidenavModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, MdSidenavModule, MdIconModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
