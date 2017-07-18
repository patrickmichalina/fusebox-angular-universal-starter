import { NgModule } from '@angular/core';
import { HttpStateTransferInterceptor } from './transfer-http-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpStateTransferInterceptor, multi: true }
  ]
})
export class TransferHttpModule { }
