import { HttpClientModule } from '@angular/common/http'
import { ChangelogComponent } from './changelog.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { ChangelogModule } from './changelog.module'
import '../../operators'

describe(ChangelogComponent.name, () => {
  let fixture: ComponentFixture<ChangelogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChangelogModule, HttpClientModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangelogComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-changelog></pm-changelog>'
})
class TestComponent {}
