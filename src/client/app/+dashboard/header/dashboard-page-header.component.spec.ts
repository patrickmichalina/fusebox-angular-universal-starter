import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { DashboardModule } from '../dashboard.module'
import { DashboardPageHeaderComponent } from './dashboard-page-header.component'

describe(DashboardPageHeaderComponent.name, () => {
  let fixture: ComponentFixture<DashboardPageHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardPageHeaderComponent)
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
  template: '<pm-dashboard-page-header></pm-dashboard-page-header>'
})
class TestComponent {}
