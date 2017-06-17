import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  imports: [
    AppRoutingModule,
    HomeModule,
    AboutModule,
    NotFoundModule,
    SharedModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'pm-app' })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
