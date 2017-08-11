import { LogoutComponent } from './logout.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe(LogoutComponent.name, () => {
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    fixture.detectChanges();
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));
});
