import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import '../main.scss';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'app' })
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
