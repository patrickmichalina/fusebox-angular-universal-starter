import { AppComponent } from './../client/app/app.component';
import { AppModule } from './../client/app/app.module';
import { NgModule } from '@angular/core';
import { ServerModule, } from '@angular/platform-server';

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
