import { AboutComponent } from './about.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { AboutModule } from './about.module'
import { AppTestingModule } from '../../../testing/app-testing.module'

@Component({
  selector: 'test-component',
  template: '<pm-about></pm-about>'
})
class TestComponent {}

describe(AboutComponent.name, () => {
  let fixture: ComponentFixture<TestComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule.forRoot(), AboutModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    fixture.detectChanges()
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})
