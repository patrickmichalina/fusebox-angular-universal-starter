import { GlobalErrorHandler } from './error-handler.service';
import { async, TestBed } from '@angular/core/testing';

describe(GlobalErrorHandler.name, () => {
  let service: GlobalErrorHandler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandler
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    service = TestBed.get(GlobalErrorHandler);
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should construct', async(() => {
    expect(service).toBeDefined();
  }));
});
