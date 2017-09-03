import { LoginComponent } from './login.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { LoginModule } from './login.module'

describe(LoginComponent.name, () => {
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoginModule],
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
