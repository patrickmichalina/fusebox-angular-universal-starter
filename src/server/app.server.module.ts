import { AppComponent } from './../client/app/app.component';
import { AppModule } from './../client/app/app.module';
import { NgModule, enableProdMode } from '@angular/core';
import { ServerModule, } from '@angular/platform-server';

if (process.env.NODE_ENV === 'production') enableProdMode();

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
