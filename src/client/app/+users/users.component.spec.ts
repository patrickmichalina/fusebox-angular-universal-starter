import { UsersComponent } from './users.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { UsersModule } from './users.module'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { of } from 'rxjs/observable/of'

@Component({
  selector: 'test-component',
  template: '<pm-users></pm-users>'
})
class TestComponent { }

describe(UsersComponent.name, () => {
  let fixture: ComponentFixture<TestComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UsersModule],
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
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})

class MockDb {
  users = [
    { email: 'test@aol.com' }
  ]

  getListKeyed() {
    return of(this.users)
  }

  get() {
    return of('')
  }
}
