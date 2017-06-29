import { PlatformState } from '@angular/platform-server';
import { ServerTransferState } from './transfer-server-state.service';
import { TestBed, async } from '@angular/core/testing';

describe(ServerTransferState.name, () => {

  it('should construct', async(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformState,
        ServerTransferState
      ]
    });
    const service = TestBed.get(ServerTransferState);
    expect(service).not.toBeNull();
  }));
});