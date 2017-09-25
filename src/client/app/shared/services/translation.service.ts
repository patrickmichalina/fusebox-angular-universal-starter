import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

export interface ITranslationService {
  translate(key: string, lang: string): Observable<any>
}

@Injectable()
export class TranslationService implements ITranslationService {
  private dict$ = this.http.get<any>('translations').shareReplay()

  constructor(private http: HttpClient) { }

  translate(key: string, lang = 'EN'): Observable<any> {
    return this.dict$.pluck(lang).map((langContext: any) => {
      const d = key.split('.').reduce((o, k) => (o || {})[k], langContext)
      console.log(key)
      console.log('valid', d)
      return d
    })
  }
}
