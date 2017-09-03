import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { Angulartics2, Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { HomeComponent } from './home.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { HomeModule } from './home.module'
import { MdButtonModule, MdCardModule } from '@angular/material'

describe(HomeComponent.name, () => {
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        MdCardModule, MdButtonModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeComponent)
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

  it('should track event when link clicked', async(() => {
    const analytics = TestBed.get(Angulartics2) as Angulartics2
    expect(analytics).toBeDefined()
    const links = fixture.debugElement.queryAll(By.css('.lead a'))
    expect(links).toHaveLength(1)
    const link = links[0].nativeElement as HTMLAnchorElement
    expect(link).toBeDefined()
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
