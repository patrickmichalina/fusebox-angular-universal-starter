import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ISetting } from '../../../../server/api/services/setting.service'

export interface ISettingService {
  settings$: Observable<ISetting>
  pluck(key: string): Observable<string>
}

@Injectable()
export class SettingService implements ISettingService {

  public settings$ = this.http.get<ISetting>('settings')
    .map(settings => {
      return {
        injections: [],
        ...settings
      }
    }).shareReplay()

  public pluck(key: string) {
    return this.settings$.map(dict => key.split('.')
      .reduce((o, k) => (o || {})[k], dict as any))
  }

  constructor(private http: HttpClient) { }
}
