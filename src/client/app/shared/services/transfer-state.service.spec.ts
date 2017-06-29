import { TransferState } from './transfer-state.service';
import { TestBed, async } from '@angular/core/testing';

describe(TransferState.name, () => {

  it('should construct', async(() => {
    TestBed.configureTestingModule({
      providers: [
        TransferState
      ]
    });
    const service = TestBed.get(TransferState);
    expect(service).not.toBeNull();
  }));
});