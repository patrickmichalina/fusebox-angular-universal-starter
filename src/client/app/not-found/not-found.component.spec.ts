import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable'
import { AuthService } from './../shared/services/auth.service'
import { of } from 'rxjs/observable/of'
import { TransferState } from '@angular/platform-browser'
import { ServerResponseService } from './../shared/services/server-response.service'
import { NotFoundComponent } from './not-found.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { NotFoundModule } from './not-found.module'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import '../../operators'

describe(NotFoundComponent.name, () => {
  let fixture: ComponentFixture<NotFoundComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotFoundModule, RouterTestingModule],
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
        },
        { provide: REQUEST, useValue: {} }
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotFoundComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    fixture.detectChanges()
    expect(fixture.componentInstance).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))

  test.skip('should show text', async(() => {
    fixture.detectChanges()
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('PAGE NOT FOUND')
    expect(fixture).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-not-found></pm-not-found>'
})
class TestComponent { }
