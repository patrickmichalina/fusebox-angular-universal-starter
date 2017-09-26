import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ISetting } from '../../../../server/api/services/setting.service'

export interface ISettingService {
  settings$: Observable<ISetting>
}

@Injectable()
export class SettingService implements ISettingService {
  settings$: Observable<any>
  private dict$ = this.http.get<any>('settings').shareReplay()

  constructor(private http: HttpClient) {
    this.dict$.take(1).subscribe(console.log)
  }
}
