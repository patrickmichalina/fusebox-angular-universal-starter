import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MdTabsModule } from '@angular/material'

@NgModule({
  imports: [HomeRoutingModule, SharedModule, MdTabsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
