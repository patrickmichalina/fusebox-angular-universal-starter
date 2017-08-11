import { ServerResponseService } from './../shared/services/server-response.service';
import { NotFoundComponent } from './not-found.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe(NotFoundComponent.name, () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [ServerResponseService]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should compile', async(() => {
    expect(fixture.componentInstance).not.toBeNull();
  }));

  it('should show text', async(() => {
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('PAGE NOT FOUND');
  }));
});
