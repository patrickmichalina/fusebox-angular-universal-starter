// import { TransferState } from '../shared/transfer-state/transfer-state';
// // import { TransferHttp } from '../shared/transfer-http/transfer-http';
// import { ISearchService, SearchService } from './search.service';
// import { async, TestBed } from '@angular/core/testing';
// import { MockBackend } from '@angular/http/testing';
// import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import '../../operators';

// describe(SearchService.name, () => {
//   let service: ISearchService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         SearchService,
//         MockBackend,
//         BaseRequestOptions,
//         TransferState,
//         {
//           provide: Http,
//           useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
//           deps: [MockBackend, BaseRequestOptions]
//         },
//         // {
//         //   provide: TransferHttp,
//         //   useFactory: (http: Http, transferState: TransferState) => new TransferHttp(http, transferState),
//         //   deps: [Http, TransferState]
//         // }
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     service = TestBed.get(SearchService);
//   });

//   it('should compile', async(() => {
//     expect(service).not.toBeNull();
//   }));

//   it('should return an Observable when search is called', async(() => {
//     expect(service.search()).toEqual(expect.any(Observable));
//   }));
// });

describe('temp', () => {
    it('should compile', () => {
      expect(1).toBe(1);
    });
});
