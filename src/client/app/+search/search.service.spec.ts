import { TransferState } from '../shared/transfer-state/transfer-state';
import { ISearchService, SearchService } from './search.service';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import '../../operators';

describe(SearchService.name, () => {
  let service: ISearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SearchService,
        TransferState
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(SearchService);
  });

  it('should compile', async(() => {
    expect(service).not.toBeNull();
  }));

  it('should return an Observable when search is called', async(() => {
    expect(service.search()).toEqual(expect.any(Observable));
  }));
});
