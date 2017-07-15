import { HomeComponent } from './home.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe(HomeComponent.name, () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));
});
