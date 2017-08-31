import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MdButtonModule, MdCardModule } from '@angular/material';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, MdCardModule, MdButtonModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
