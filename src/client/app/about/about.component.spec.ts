import { AboutComponent } from './about.component';
import { async, TestBed } from '@angular/core/testing';

describe(AboutComponent.name, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    });
  });

  it('should compile',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(AboutComponent);
          expect(fixture.nativeElement).toBeTruthy();
        });
    }));
});