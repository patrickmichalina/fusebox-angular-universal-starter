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

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'Fusebox Angular Universal Starter',
    defaults: {
      title: 'Fusebox Angular Universal Starter',
      description: 'Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator.',
      'og:image': 'https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/apple-touch-startup-image-1536x2008.png',
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
      useFactory: (metaFactory)
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
