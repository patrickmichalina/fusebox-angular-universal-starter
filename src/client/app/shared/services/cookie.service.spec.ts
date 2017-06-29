import { PlatformService } from './platform.service';
import { CookieService, ICookieService } from './cookie.service';
import { TestBed, async } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';

describe(CookieService.name, () => {

  it('should construct', async(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        PlatformService,
        { provide: REQUEST, useValue: {} }
      ]
    });
    const service = TestBed.get(CookieService) as ICookieService;
    expect(service).not.toBeNull();
  }));
});