import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'pm-app'
    }),
    BrowserAnimationsModule,
    AppModule
  ]
})
export class AppBrowserModule { }
