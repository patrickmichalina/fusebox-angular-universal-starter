import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { TestModule } from './test.module'
import { TestComponent } from './test.component'
import { RouterTestingModule } from '@angular/router/testing'
import { TestChildComponent } from './testChild/testChild.component'
import { TestChild1Component } from './testChild1/testChild1.component'
import { Route } from '@angular/router'
import { EnvironmentService } from '../../shared/services/environment.service'
import { APP_BASE_HREF } from '@angular/common'

describe(TestComponent.name, () => {
  const config: Array<Route> = [
    {
      path: '',
      component: TestComponent,
      pathMatch: 'full',
      children: [
        { path: '', redirectTo: 'test-child', pathMatch: 'full' },
        {
          path: 'test-child',
          component: TestChildComponent
        },
        {
          path: 'test-child-1',
          component: TestChild1Component
        }
      ]
    }
  ]

  let fixture: ComponentFixture<TestComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, RouterTestingModule.withRoutes(config)],
      declarations: [TestingComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        EnvironmentService
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestComponent)
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
  template: '<pm-test></pm-test>'
})
class TestingComponent {}
