import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { INavbarService, NavbarService } from './navbar.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import '../../../operators';

describe(NavbarComponent.name, () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarService: INavbarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent, TestComponent],
      providers: [NavbarService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    navbarService = TestBed.get(NavbarService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile', async(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeDefined();
  }));

  it('should contain a list of links', async(() => {
    fixture.detectChanges();
    const htmlDebugElement = fixture.debugElement.queryAll(By.css('.navbar-nav'))[0];
    expect(htmlDebugElement).toBeTruthy();

    const listDomElement = htmlDebugElement.nativeElement as HTMLUListElement;
    expect(listDomElement).toEqual(expect.any(HTMLUListElement));

    navbarService.menu$.subscribe(items => {
      expect(listDomElement.children.length).toEqual(items.length + 1);
    });
  }));
});

@Component({
  selector: 'test-component',
  template: '<pm-navbar></pm-navbar>'
})
class TestComponent {}
