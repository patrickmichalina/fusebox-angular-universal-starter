import { Observable } from 'rxjs/Observable'
import { Service } from 'typedi'
import { SETTINGS } from './settings'
import { FirebaseAppConfig } from 'angularfire2'

export interface ISetting {
  readonly host: string
  readonly og: {
    readonly title: string
    readonly description: string
    readonly image: string
    readonly type: string
    readonly locale: string
  },
  readonly assets: {
    readonly userAvatarImage: string
  }
  readonly tokens: {
    readonly facebookAppId: string
  },
  readonly injections: ReadonlyArray<Injectable>,
  readonly i18n: {
    readonly [key: string]: any
  },
  readonly firebase: {
    readonly appName: string
    readonly config: FirebaseAppConfig
  }
}

export interface Injectable {
  readonly inHead: boolean
  readonly element: string
  readonly value?: string
  readonly attributes?: { readonly [key: string]: string | boolean }
}

export interface ISettingRepository {
  getDictionary(): Observable<ISetting>
  // add(key: string, value: string, language?: string): void
}

@Service()
export class SettingRepository implements ISettingRepository {
  private readonly db = SETTINGS

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
