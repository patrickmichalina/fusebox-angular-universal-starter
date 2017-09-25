import { Observable } from 'rxjs/Observable'
import { Service } from 'typedi'
import { SettingRepository } from '../repositories'

export interface ISettingService {
  getTranslation(lang: string): Observable<any>
  getDictionary(): Observable<any>
  getLanguageDictionary(lang: string): Observable<any>
}

@Service()
export class SettingService implements ISettingService {

  constructor(private repo: SettingRepository) { }

  getDictionary(): Observable<any> {
    const dictionary = this.repo.getDictionary()
    return Observable.of(dictionary)
  }

  getLanguageDictionary(lang: string): Observable<any> {
    throw new Error('Method not implemented.')
  }

  getTranslation(key: string, lang = 'EN') {
    const dictionary = this.repo.getDictionary()
    if (!dictionary) throw new Error('')

    const languageContext = dictionary[lang]
    const value = key.split('.').reduce((o, k) => (o || {})[k], languageContext)

    return Observable.of(value)
  }
}
