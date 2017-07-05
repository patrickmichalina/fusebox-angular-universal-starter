import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe(NavbarComponent.name, () => {
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  })

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  })

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));
});