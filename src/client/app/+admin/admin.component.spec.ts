import { AdminComponent } from './admin.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { AdminModule } from './admin.module'

describe(AdminComponent.name, () => {
  let fixture: ComponentFixture<AdminComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminComponent)
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
  template: '<pm-admin></pm-admin>'
})
class TestComponent {}
