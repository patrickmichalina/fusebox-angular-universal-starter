import { PlatformService } from './platform.service';
import { AdblockService, IAdblockService } from './adblock.service';
import { TestBed, async } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import '../../../operators';

describe(AdblockService.name, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AdblockService,
        PlatformService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  }));

  // beforeEach(inject([MockBackend, Http, PlatformService],
  //   (mb: MockBackend, http: Http, ps: PlatformService) => {
  //     mockBackend = mb;
  //     adblockService = new AdblockService(ps, http);
  //   }));

  it('should construct', async(() => {
    const service = TestBed.get(AdblockService) as IAdblockService;
    expect(service).toBeTruthy();
  }));

  it('should return an observable when called', async(() => {
    const service = TestBed.get(AdblockService) as IAdblockService;
    expect(service.adsAreBlocked$).toEqual(expect.any(Observable));
  }));

  // it('should not detect ads when adblock is not present', () => {
  //   const service = TestBed.get(AdblockService) as IAdblockService;
  //   const mockBackend = TestBed.get(MockBackend) as MockBackend;

  //   mockBackend.connections.subscribe((c: any) => {
  //     c.mockRespond(new Response(new ResponseOptions({ status: 200 })));
  //   });

  //   return service.adsAreBlocked$.toPromise().then(result => expect(result).toEqual(true));
  // });

  // it('should detect ads when adblock is enabled', async(() => {
  //   const service = TestBed.get(AdblockService) as IAdblockService;
  //   const mockBackend = TestBed.get(MockBackend) as MockBackend;

  //   mockBackend.connections.subscribe((connection: MockConnection) => {
  //     expect(connection.request.method).toEqual(RequestMethod.Get);
  //     // connection.mockRespond(new Response(new ResponseOptions({ status: 0 })));
  //   });

  //   // return service.adsAreBlocked$.toPromise().then(result => {
  //   //   console.log(result);
  //   //   return expect(result).toEqual(false)
  //   // });
  // }));
});