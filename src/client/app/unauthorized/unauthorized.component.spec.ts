import { AuthService } from './../shared/services/auth.service'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { UnauthorizedComponent } from './unauthorized.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { UnauthorizedModule } from './unauthorized.module'
import { AngularFireModule } from 'angularfire2'
import { AppTestingModule } from '../../../testing/app-testing.module'

@Component({
  selector: 'test-component',
  template: '<pm-unauthorized></pm-unauthorized>'
})
class TestComponent { }

describe(UnauthorizedComponent.name, () => {
  let fixture: ComponentFixture<UnauthorizedComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule.forRoot(), UnauthorizedModule, AngularFireAuthModule, AngularFireModule.initializeApp({
        'apiKey': '1',
        'authDomain': 'app.firebaseapp.com',
        'databaseURL': 'https://app.firebaseio.com',
        'projectId': 'firebase-app',
        'messagingSenderId': '1'
      })],
      declarations: [TestComponent],
      providers: [
        { provide: AuthService, useValue: {} }
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnauthorizedComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})
