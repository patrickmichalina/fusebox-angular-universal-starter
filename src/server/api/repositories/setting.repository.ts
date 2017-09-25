import { Service } from 'typedi'
// tslint:disable-next-line:no-require-imports
const jsonDb = require('./settings.json')

export interface ISettingRepository {
  getDictionary(): { [key: string]: any }
  add(key: string, value: string, language?: string): void
}

@Service()
export class SettingRepository implements ISettingRepository {
  private db = jsonDb

  getDictionary(): { [key: string]: any } {
    return this.db
  }

  add(key: string, value: string, language = 'EN') {
    this.db[language][key] = value
  }

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
