import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { INavbarService, NavbarService } from './navbar.service';
import { By } from '@angular/platform-browser';
import '../../../operators';

describe(NavbarComponent.name, () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarService: INavbarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [NavbarService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    navbarService = TestBed.get(NavbarService);
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));

  it('should contain a list of links', async(() => {
    const htmlDebugElement = fixture.debugElement.queryAll(By.css('.navbar-nav'))[0];
    expect(htmlDebugElement).toBeTruthy();

    const listDomElement = htmlDebugElement.nativeElement as HTMLUListElement;
    expect(listDomElement).toEqual(expect.any(HTMLUListElement));

    navbarService.menu$.subscribe(items => {
      expect(listDomElement.children.length).toEqual(items.length + 1);
    });
  }));
});
