import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface IAdblockService {
  adsAreBlocked$: Observable<boolean>;
}

@Injectable()
export class AdblockService implements IAdblockService {
  private source = new Subject<boolean>();
  public adsAreBlocked$ = this.source.asObservable();

  constructor(private platformService: PlatformService, private http: Http) {  
    if (this.platformService.isBrowser) {
      this.http.get('./ad-server.js')
        .switchMap(a => Observable.of(false))
        .catch(a => Observable.of(true))        
        .subscribe(a => this.source.next(a));
    }
  }
}