import { Observable } from 'rxjs/Observable';
import { ISearchService, SearchService } from './search.service';
import { SearchComponent } from './search.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { URLSearchParams } from '@angular/http';
import { Component } from '@angular/core';
import { SearchModule } from './search.module';
import '../../operators';

describe(SearchComponent.name, () => {
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchModule],
      declarations: [TestComponent],
      providers: [
        { provide: SearchService, useValue: new MockSearchService() }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
  });

  it('should match snapshot', async(() => {
    expect(fixture).toMatchSnapshot();
  }));

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined();
  }));
});

@Component({
  selector: 'test-component',
  template: '<pm-search></pm-search>'
})
class TestComponent {}

class MockSearchService implements ISearchService {
  returnValue: any[] = [];

  search(search?: string | undefined, sort?: string | undefined, order?: string | undefined): Observable<any> {
    const params = new URLSearchParams();

    if (search) params.set('q', search);
    if (sort) params.set('sort', sort);
    if (order) params.set('order', order);

    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
