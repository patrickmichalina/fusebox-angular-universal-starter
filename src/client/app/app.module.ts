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
import { EnvironmentService } from './shared/services/environment.service';

export function metaFactory(environmentService: EnvironmentService): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: environmentService.config.pageTitleSeparator,
    applicationName: environmentService.config.name,
    applicationUrl: environmentService.config.server.host,
    defaults: {
      title: environmentService.config.name,
      description: environmentService.config.description,
      'og:image': environmentService.config.og.defaultSocialImage,
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US'
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
      useFactory: (metaFactory),
      deps: [EnvironmentService]
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent],
})
export class AppModule { }
