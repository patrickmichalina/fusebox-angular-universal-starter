import { AppComponent } from './app.component';
import { EnvConfig } from '../../../tools/config/app.config';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { HomeComponent } from './+home/home.component';
import { AboutComponent } from './+about/about.component';
import { SearchComponent } from './+search/search.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ENV_CONFIG } from './app.config';
import { EnvironmentService } from './shared/services/environment.service';
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2';

const TestingConfig: EnvConfig = {
  name: 'Fusebox Angular Universal Starter',
  description: 'Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator. Created by Patrick Michalina',
  pageTitleSeparator: ' - ',
  og: {
    defaultSocialImage: 'https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/android-chrome-512x512',
    facebookAppId: '117309532219749'
  },
  server: {
    host: 'http://localhost',
    port: 8083,
    minifyIndex: true
  }
};

describe('App component', () => {
  const config: Array<Route> = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(config), Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])],
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
          const fixture = TestBed.createComponent(TestComponent);
          const compiled = fixture.nativeElement;

          expect(compiled).toBeTruthy();
        });
    }));
});

@Component({
  selector: 'test-cmp',
  template: '<pm-app></pm-app>'
})
class TestComponent { }
