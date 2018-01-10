import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { Test1Component } from './test1.component'
import { Test1Module } from './test1.module'

describe(Test1Component.name, () => {
  let fixture: ComponentFixture<Test1Component>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Test1Module],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Test1Component)
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
  template: '<pm-test1></pm-test1>'
})
class TestComponent {}
