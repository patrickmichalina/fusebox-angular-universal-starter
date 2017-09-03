import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { PlatformService } from './platform.service'
import { Observable } from 'rxjs/Observable'

export interface IAdblockService {
  adBlockerIsActive$: Observable<boolean>
}

@Injectable()
export class AdblockService implements IAdblockService {
  public adBlockerIsActive$ = this.platformService.isBrowser
    ? this.http.get('./ad-server.js')
      .switchMap(a => Observable.of(false))
      .catch(a => Observable.of(true))
    : Observable.of(false)

  constructor(private platformService: PlatformService, private http: Http) { }
}
