import { AppComponent } from './../client/app/app.component'
import { enableProdMode, NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { AppModule } from './../client/app/app.module'
import { EnvConfig } from '../../tools/config/app.config'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/first'
import '../client/operators'

declare var __process_env__: EnvConfig

if (__process_env__.env !== 'prod') enableProdMode()

@NgModule({
  imports: [
    ServerModule,
    ServerTransferStateModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
