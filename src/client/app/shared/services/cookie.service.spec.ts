import { PlatformService } from './platform.service';
import { CookieService, ICookieService } from './cookie.service';
import { TestBed, async } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';

describe(CookieService.name, () => {
  let service: ICookieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        PlatformService,
        { provide: REQUEST, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(CookieService);
  });

  it('should construct', async(() => {
    expect(service).not.toBeNull();
  }));
});