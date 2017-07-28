import { IServerResponseService, ServerResponseService } from './server-response.service';
import { async, TestBed } from '@angular/core/testing';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

describe(ServerResponseService.name, () => {
  let service: IServerResponseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerResponseService,
        {
          provide: RESPONSE,
          useValue: new MockResponse()
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ServerResponseService);
  });

  it('should construct', async(() => {
    expect(service).toBeTruthy();
  }));

  it('should set header', async(() => {
    service.setHeader('test', 'awesome value');
    expect(service.getHeader('test')).toBe('awesome value');
  }));

  it('should set multiple headers', async(() => {
    service.setHeaders({ thing: '1', thingy: '3'});
    expect(service.getHeader('thing')).toBe('1');
    expect(service.getHeader('thingy')).toBe('3');
  }));
});

class MockResponse {
  store: any = {};

  header(key: string, value: string) {
    this.store[key] = value;
  }

  getHeader(key: string) {
    return this.store[key];
  }
}
