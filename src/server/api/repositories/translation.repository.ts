import { Service } from 'typedi'

export interface ITranslationRepository {
  getDictionary(): { [key: string]: any }
  add(key: string, value: string, language?: string): void
}

@Service()
export class TranslationRepository implements ITranslationRepository {
  // simple in memory key/val database of translations
  // this could be a databse instead
  private db: { [key: string]: any } = {
    EN: {
      HOME: {
        TITLE: 'Hello',
        DESCRIPTION: 'some page'
      }
    },
    JP: {
      HOME: {
        TITLE: 'こんにちは',
        DESCRIPTION: ''
      }
    }
  }

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
