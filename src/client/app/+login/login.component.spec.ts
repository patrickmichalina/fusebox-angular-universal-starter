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
      imports: [LoginModule, AngularFireModule.initializeApp({
        'apiKey': '1',
        'authDomain': 'app.firebaseapp.com',
        'databaseURL': 'https://app.firebaseio.com',
        'projectId': 'firebase-app',
        'messagingSenderId': '1'
      }), AngularFireAuthModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should match snapshot', async(() => {
    expect(fixture).toMatchSnapshot()
  }))

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-login></pm-login>'
})
class TestComponent {}
