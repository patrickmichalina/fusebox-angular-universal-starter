import { AboutComponent } from './about.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { AboutModule } from './about.module'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { of } from 'rxjs/observable/of'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe(AboutComponent.name, () => {
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AboutModule, NoopAnimationsModule],
      declarations: [TestComponent],
      providers: [
        { provide: FirebaseDatabaseService, useValue: new MockDb() }
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  test.skip('should compile', async(() => {
    fixture.detectChanges()
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-about></pm-about>'
})
class TestComponent {}

class MockDb {
  get() {
    return of('test')
  }
  getList() {
    return of([])
  }
}
