import { TransferState } from '../modules/transfer-state/transfer-state';
import { TransferHttp } from '../modules/transfer-http/transfer-http';
import { SearchService, ISearchService } from './search.service';
import { async, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../../operators';

describe(SearchService.name, () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        SearchService,
        MockBackend,
        BaseRequestOptions,
        TransferState,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: TransferHttp,
          useFactory: (http: Http, transferState: TransferState) => new TransferHttp(http, transferState),
          deps: [Http, TransferState]
        }
      ]
    });
  });

  it('should compile', async(() => {
    const service = TestBed.get(SearchService) as ISearchService;
    expect(service).not.toBeNull();
  }));

  it('should return an Observable when search is called', async(() => {
    const service = TestBed.get(SearchService) as ISearchService;
    expect(service.search()).toEqual(jasmine.any(Observable));
  }));
});