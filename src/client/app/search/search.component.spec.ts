import { Observable } from 'rxjs/Observable';
import { SearchService, ISearchService } from './search.service';
import { SearchComponent } from './search.component';
import { async, TestBed } from '@angular/core/testing';
import { URLSearchParams } from '@angular/http';
import '../../operators';

describe(SearchComponent.name, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SearchService, useValue: new MockSearchService() }
      ],
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

class MockSearchService implements ISearchService {
  public returnValue: any[];

  search(search?: string | undefined, sort?: string | undefined, order?: string | undefined): Observable<any> {
    const params = new URLSearchParams();
    
    if(search) params.set('q', search);
    if(sort) params.set('sort', sort);
    if(order) params.set('order', order);
    
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
