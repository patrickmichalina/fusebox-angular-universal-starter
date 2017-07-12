import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { EnvironmentService } from './shared/services/environment.service';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { ServerTransition } from './server-trans';

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
    TransferHttpModule,
    ServerTransition.forRoot({ appId: 'pm-app' }),
    SharedModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
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
