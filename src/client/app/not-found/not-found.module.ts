import { ServerResponseService } from './../shared/services/server-response.service';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [NotFoundRoutingModule, SharedModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  providers: [ServerResponseService]
})
export class NotFoundModule { }
