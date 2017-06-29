import { SearchComponent } from './search.component';
import { async, TestBed } from '@angular/core/testing';

describe(SearchComponent.name, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    });
  });

  it('should compile',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(SearchComponent);
          expect(fixture.componentInstance).not.toBeNull();
        });
    }));
});