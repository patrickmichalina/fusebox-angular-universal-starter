import { SignupComponent } from './signup.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe(SignupComponent.name, () => {
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
  })

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  })

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));
});