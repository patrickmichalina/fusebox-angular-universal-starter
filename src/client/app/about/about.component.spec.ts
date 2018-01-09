import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutComponent } from './about.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { AboutModule } from './about.module'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { of } from 'rxjs/observable/of'
import { MaterialModule } from '../shared/material.module'

@Component({
  selector: 'test-component',
  template: '<pm-about></pm-about>'
})
class TestComponent {}

describe(AboutComponent.name, () => {
  let fixture: ComponentFixture<TestComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AboutModule, MaterialModule, BrowserAnimationsModule],
      declarations: [TestComponent],
      providers: [
        { provide: FirebaseDatabaseService, useValue: new MockDb() }
      ]
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

class MockDb {
  get() {
    return of('test')
  }
  getList() {
    return of([])
  }
}
