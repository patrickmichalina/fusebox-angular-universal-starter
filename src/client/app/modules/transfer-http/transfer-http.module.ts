import { NgModule } from '@angular/core';
import { TransferHttp } from './transfer-http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [HttpModule],
  providers: [
    TransferHttp
  ]
})
export class TransferHttpModule {}
