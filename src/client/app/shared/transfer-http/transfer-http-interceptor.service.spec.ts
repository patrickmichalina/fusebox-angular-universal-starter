import { ITransferState, TransferState } from './../transfer-state/transfer-state';
import { HttpStateTransferInterceptor } from './transfer-http-interceptor.service';
import { async, TestBed } from '@angular/core/testing';
// import { ENV_CONFIG } from '../../app.config';

describe(HttpStateTransferInterceptor.name, () => {
  let service: HttpStateTransferInterceptor;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpStateTransferInterceptor,
        { provide: TransferState, useValue: new MockTransferState() }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    service = TestBed.get(HttpStateTransferInterceptor);
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should construct', async(() => {
    expect(service).toBeDefined();
  }));

});

class MockTransferState implements ITransferState {
  get(key: string) {
    throw new Error('Method not implemented.');
  }
  keys(): IterableIterator<string> {
    throw new Error('Method not implemented.');
  }
  set(key: string, value: any): Map<string, any> {
    throw new Error('Method not implemented.');
  }
  toJson() {
    throw new Error('Method not implemented.');
  }
  initialize(obj: { [key: string]: any; }): Map<string, any> {
    throw new Error('Method not implemented.');
  }
  bust(): Map<string, any> {
    throw new Error('Method not implemented.');
  }
  bustByKey(key: string): Map<string, any> {
    throw new Error('Method not implemented.');
  }
  bustByKeyPattern(pattern: RegExp): Map<string, any> {
    throw new Error('Method not implemented.');
  }

}
