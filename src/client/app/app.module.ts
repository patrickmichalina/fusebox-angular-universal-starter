import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AboutModule } from './about/about.module';
import { SearchModule } from './search/search.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundModule } from './not-found/not-found.module';
import { TransferHttpModule } from './modules/transfer-http/transfer-http.module';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { EnvConfig } from './app.config';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: EnvConfig.pageTitleSeparator,
    applicationName: EnvConfig.name,
    applicationUrl: EnvConfig.server.host,
    defaults: {
      title: EnvConfig.name,
      description: EnvConfig.description,
      'og:image': EnvConfig.og.defaultSocialImage,
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US',
    }
  });
}

@NgModule({
  imports: [
    AppRoutingModule,
    HomeModule,
    AboutModule,
    SearchModule,
    NotFoundModule,
    TransferHttpModule,
    BrowserModule.withServerTransition({ appId: 'pm-app' }),
    SharedModule.forRoot(),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
