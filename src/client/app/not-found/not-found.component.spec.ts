import { NotFoundComponent } from './not-found.component';
import { async, TestBed } from '@angular/core/testing';

describe(NotFoundComponent.name, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    });
  });

  it('should compile',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(NotFoundComponent);
          expect(fixture.componentInstance).not.toBeNull();
        });
    }));

  it('should show text',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(NotFoundComponent);
          expect(fixture.debugElement.nativeElement.innerHTML).toBe('PAGE NOT FOUND');
        });
    }));
});