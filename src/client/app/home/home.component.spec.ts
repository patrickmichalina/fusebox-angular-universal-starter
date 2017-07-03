import { HomeComponent } from './home.component';
import { async, TestBed } from '@angular/core/testing';

describe(HomeComponent.name, () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
  });

  it('should compile',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(HomeComponent);
          expect(fixture.nativeElement).toBeTruthy();
        });
    }));
});