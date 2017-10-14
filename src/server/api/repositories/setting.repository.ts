import { Observable } from 'rxjs/Observable'
import { Service } from 'typedi'
import { SETTINGS } from './settings'
import { FirebaseAppConfig } from 'angularfire2'

export interface ISetting {
  host: string
  og: {
    title: string
    description: string
    image: string
    type: string
    locale: string
  },
  assets: {
    userAvatarImage: string
  }
  tokens: {
    facebookAppId: string
  },
  injections: Injectable[],
  i18n: {
    [key: string]: any
  },
  firebase: {
    appName: string
    config: FirebaseAppConfig
  }
}

export interface Injectable {
  inHead: boolean
  element: string
  value?: string
  attributes?: { [key: string]: string | boolean }
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
