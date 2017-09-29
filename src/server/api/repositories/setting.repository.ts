import { Observable } from 'rxjs/Observable'
import { Service } from 'typedi'
import { SETTINGS } from './settings'

export interface ISetting {
  host: string
  og: {
    title: string
    description: string
    image: string
    type: string
    locale: string
  },
  tokens: {
    facebookAppId: string
  },
  i18n: {
    [key: string]: any
  }
}

export interface ISettingRepository {
  getDictionary(): Observable<ISetting>
  // add(key: string, value: string, language?: string): void
}

@Service()
export class SettingRepository implements ISettingRepository {
  private db = SETTINGS

  getDictionary(): Observable<ISetting> {
    return Observable.of(this.db)
  }

  // add(key: string, value: string, language = 'EN') {
  //   key.split('.').reduce((a, b) => {
  //     return a
  //   })
  //   // this.db[language][key] = value
  // }

  // remove(key: string, language = 'EN') {
  //   const languageContext = this.db[language]
  //   const reducedDb = key.split('.').reduce((o, k, i, array) => {
  //     if (i === array.length - 1) {
  //       console.log(languageContext[k])
  //     }
  //     // console.log(o)
  //     return o
  //   }, languageContext)
  //   // console.log(reducedDb)
  //   // this.db = res
  //   return 'd'
  // }
}
