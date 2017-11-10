import { REQUEST } from '@nguniversal/express-engine/tokens'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { UnauthorizedComponent } from './unauthorized.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { UnauthorizedModule } from './unauthorized.module'
import { AngularFireModule } from 'angularfire2'

describe(UnauthorizedComponent.name, () => {
  let fixture: ComponentFixture<UnauthorizedComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UnauthorizedModule, AngularFireAuthModule, AngularFireModule.initializeApp({
        'apiKey': '1',
        'authDomain': 'app.firebaseapp.com',
        'databaseURL': 'https://app.firebaseio.com',
        'projectId': 'firebase-app',
        'messagingSenderId': '1'
      })],
      declarations: [TestComponent],
      providers: [
        { provide: REQUEST, useValue: {} }
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

@Component({
  selector: 'test-component',
  template: '<pm-logout></pm-logout>'
})
class TestComponent { }
