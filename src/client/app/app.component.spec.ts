import { SharedModule } from './shared/shared.module'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AboutComponent } from './+about/about.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { APP_BASE_HREF } from '@angular/common'
import { Route } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Component } from '@angular/core'
import { HomeComponent } from './+home/home.component'
import { AppModule } from './app.module'
import { AppBrowserModule } from './app.browser.module'
import { EnvConfig } from '../../../tools/config/app.config'
import { ENV_CONFIG } from './app.config'
import { EnvironmentService } from './shared/services/environment.service'
import { Angulartics2Module } from 'angulartics2'
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NavbarService } from './shared/navbar/navbar.service'
import { MatCardModule } from '@angular/material'
import { AngularFireModule } from 'angularfire2'
import '../operators'

export const TESTING_CONFIG: EnvConfig = {
  name: 'Fusebox Angular Universal Starter',
  // tslint:disable-next-line:max-line-length
  description: 'Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator. Created by Patrick Michalina',
  firebase: {

  } as any,
  endpoints: {
    api: 'http://localhost:8000/api',
    websocketServer: 'ws://localhost:8001'
  },
  host: 'http://localhost:8083'
}

@Component({
  selector: 'test-cmp',
  template: '<pm-app></pm-app>'
})
class TestComponent { }

describe('App component', () => {
  const config: Array<Route> = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent }
  ]

  let fixture: ComponentFixture<TestComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        AppBrowserModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(config),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        MatCardModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp({
          'apiKey': '1',
          'authDomain': 'app.firebaseapp.com',
          'databaseURL': 'https://app.firebaseio.com',
          'projectId': 'firebase-app',
          'messagingSenderId': '1'
        })
      ],
      declarations: [TestComponent, HomeComponent, AboutComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ENV_CONFIG, useValue: TESTING_CONFIG },
        EnvironmentService,
        NavbarService
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  test.skip('should build without a problem', async(() => {
    expect(fixture.nativeElement).toBeTruthy()
    expect(fixture.nativeElement).toMatchSnapshot()
  }))
})
