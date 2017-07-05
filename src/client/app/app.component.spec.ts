import { EnvConfig } from '../../../tools/config/app.config';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ENV_CONFIG } from './app.config';
import { EnvironmentService } from './shared/services/environment.service';

const TestingConfig: EnvConfig = {
  name: "Fusebox Angular Universal Starter",
  description: "Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator. Created by Patrick Michalina",
  pageTitleSeparator: " - ",
  og: {
    defaultSocialImage: "https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/android-chrome-512x512",
    facebookAppId: "117309532219749"
  },
  server: {
    host: "http://localhost",
    port: 8083,
    minifyIndex: true
  }
}

describe('App component', () => {
  let config: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(config)],
      declarations: [TestComponent, NavbarComponent, AppComponent,
        HomeComponent, AboutComponent, SearchComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ENV_CONFIG, useValue: TestingConfig },
        EnvironmentService
      ]
    }).compileComponents();
  }));

  it('should build without a problem',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let compiled = fixture.nativeElement;

          expect(compiled).toBeTruthy();
        });
    }));
});

@Component({
  selector: 'test-cmp',
  template: '<pm-app></pm-app>'
})
class TestComponent { }