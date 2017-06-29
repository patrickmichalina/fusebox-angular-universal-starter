import { TransferHttp } from './transfer-http.service';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { TransferState } from './transfer-state.service';

describe(TransferHttp.name, () => {

  it('should construct', async(() => {
    TestBed.configureTestingModule({
      providers: [
        TransferHttp,
        TransferState,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    const service = TestBed.get(TransferHttp);
    expect(service).not.toBeNull();
  }));
});