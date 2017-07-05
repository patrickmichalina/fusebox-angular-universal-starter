import { LogoutComponent } from './logout.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe(LogoutComponent.name, () => {
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    fixture.detectChanges();
  })

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  })

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));
});