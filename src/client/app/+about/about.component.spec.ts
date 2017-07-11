import { AboutComponent } from './about.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe(AboutComponent.name, () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
  })

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  })

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeTruthy();
  }));
});