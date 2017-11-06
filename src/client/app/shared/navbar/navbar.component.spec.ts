import { MaterialModule } from '../material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { NavbarComponent } from './navbar.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { INavbarService, NavbarService } from './navbar.service'
import { By } from '@angular/platform-browser'
import { Component } from '@angular/core'
import { MatRipple } from '@angular/material'
import '../../../operators'

describe(NavbarComponent.name, () => {
  let fixture: ComponentFixture<NavbarComponent>
  let navbarService: INavbarService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
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

  it('should compile', async(() => {
    fixture.detectChanges()
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture.nativeElement).toMatchSnapshot()
  }))

  it('should contain a list of links', async(() => {
    fixture.detectChanges()
    const buttonLinks = fixture.debugElement.queryAll(By.directive(MatRipple))
    expect(buttonLinks).toBeDefined()

    navbarService.menu$.subscribe(items => {
      expect(buttonLinks.length).toEqual(items.length + 4)
    })
    expect(fixture.nativeElement).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-navbar></pm-navbar>'
})
class TestComponent {}
