import { RouterTestingModule } from '@angular/router/testing'
import { NavbarComponent } from './navbar.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { INavbarService, NavbarService } from './navbar.service'
import { By } from '@angular/platform-browser'
import { Component } from '@angular/core'
import { MdButtonModule, MdRipple } from '@angular/material'
import '../../../operators'

describe(NavbarComponent.name, () => {
  let fixture: ComponentFixture<NavbarComponent>
  let navbarService: INavbarService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MdButtonModule],
      declarations: [NavbarComponent, TestComponent],
      providers: [NavbarService]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent)
    navbarService = TestBed.get(NavbarService)
  })

  afterEach(() => {
    TestBed.resetTestingModule()
  })

  it('should match snapshot', () => {
    fixture.detectChanges()
    expect(fixture).toMatchSnapshot()
  })

  it('should compile', async(() => {
    fixture.detectChanges()
    expect(fixture.nativeElement).toBeDefined()
  }))

  it('should contain a list of links', async(() => {
    fixture.detectChanges()
    const buttonLinks = fixture.debugElement.queryAll(By.directive(MdRipple))
    expect(buttonLinks).toBeDefined()

    navbarService.menu$.subscribe(items => {
      expect(buttonLinks.length).toEqual(items.length + 3)
    })
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-navbar></pm-navbar>'
})
class TestComponent {}
