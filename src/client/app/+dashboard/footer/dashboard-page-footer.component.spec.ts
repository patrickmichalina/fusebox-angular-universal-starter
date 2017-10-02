import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { DashboardPageFooterComponent } from './dashboard-page-footer.component'
import { DashboardModule } from '../dashboard.module'

describe(DashboardPageFooterComponent.name, () => {
  let fixture: ComponentFixture<DashboardPageFooterComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardPageFooterComponent)
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
  template: '<pm-dashboard-page-footer></pm-dashboard-page-footer>'
})
class TestComponent {}
