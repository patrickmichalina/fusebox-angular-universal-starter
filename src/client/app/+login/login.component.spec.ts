import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from './../shared/services/auth.service'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { LoginComponent } from './login.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { LoginModule } from './login.module'
import { AngularFireModule } from 'angularfire2'

describe(LoginComponent.name, () => {
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoginModule, RouterTestingModule, AngularFireModule.initializeApp({
        'apiKey': '1',
        'authDomain': 'app.firebaseapp.com',
        'databaseURL': 'https://app.firebaseio.com',
        'projectId': 'firebase-app',
        'messagingSenderId': '1'
      }), AngularFireAuthModule],
      declarations: [TestComponent],
      providers: [
        { provide: AuthService, userValue: {

        }}
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-login></pm-login>'
})
class TestComponent {}
