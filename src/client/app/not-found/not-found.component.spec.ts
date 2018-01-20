import { NotFoundComponent } from './not-found.component'
import { AuthService } from './../shared/services/auth.service'
import { of } from 'rxjs/observable/of'
import { TransferState } from '@angular/platform-browser'
import { ServerResponseService } from './../shared/services/server-response.service'
import { Observable } from 'rxjs/Observable'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { NotFoundModule } from './not-found.module'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { AppTestingModule } from '../../../testing/app-testing.module'

@Component({
  selector: 'test-component',
  template: '<pm-not-found></pm-not-found>'
})
class TestComponent { }

describe(NotFoundComponent.name, () => {
  let fixture: ComponentFixture<TestComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotFoundModule, AppTestingModule.forRoot()],
      declarations: [TestComponent],
      providers: [
        ServerResponseService,
        TransferState,
        {
          provide: FirebaseDatabaseService,
          useValue: {
            get() {
              return of({})
            }
          }
        },
        {
          provide: AuthService,
          useValue: {
            user$: Observable.of({})
          }
        }
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
    expect(fixture.componentInstance).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})
