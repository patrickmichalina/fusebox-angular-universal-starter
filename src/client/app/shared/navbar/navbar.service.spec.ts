import { async, TestBed } from '@angular/core/testing';
import { INavbarService, NavbarService } from './navbar.service';
import { Observable } from 'rxjs/Observable';
import '../../../operators';

describe(NavbarService.name, () => {
  let service: INavbarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        NavbarService
      ]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(NavbarService);
  });

  it('should construct', async(() => {
    expect(service).toBeTruthy();
  }));

  it('should return an observable when called', async(() => {
    expect(service.menu$).toEqual(expect.any(Observable));
  }));
});
