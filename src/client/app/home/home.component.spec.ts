import { By } from '@angular/platform-browser'
import { Angulartics2 } from 'angulartics2'
import { HomeComponent } from './home.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { HomeModule } from './home.module'
import { MatRaisedButtonCssMatStyler } from '@angular/material'
import { AppTestingModule } from '../../../testing/app-testing.module'

describe(HomeComponent.name, () => {
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule.forRoot(), HomeModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))

  it('should track event when link clicked', async(() => {
    const analytics = TestBed.get(Angulartics2) as Angulartics2
    expect(analytics).toBeDefined()
    const button = fixture.debugElement.query(By.directive(MatRaisedButtonCssMatStyler))
    expect(button).toBeTruthy()
    const link = button.nativeElement as HTMLAnchorElement
    expect(link).toBeTruthy()
    analytics.eventTrack.subscribe(eventTrack => {
      expect(eventTrack).toBeDefined()
      expect(eventTrack.action).toEqual('ViewRepo')
      expect(eventTrack.properties.eventType).toEqual('click')
    })
    link.click()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-home></pm-home>'
})
class TestComponent { }
