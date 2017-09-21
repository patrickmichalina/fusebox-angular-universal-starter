import { Body, Get, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { TranslationService } from '../services'
import { MinLength } from 'class-validator'

export class TheThing {
  @MinLength(6)
  password: string
}

@JsonController()
export class TranslationsController {
  constructor(private ts: TranslationService) {

  }

  @Get('/translations')
  getDictionary() {
    return this.ts.getDictionary().take(1).toPromise()
  }

  @Get('/translations/:language')
  getLanguageDictionary( @Param('language') language: string, @Param('key') key: string) {
    // return this.ts.getTranslation(key, language).toPromise()
    throw new NotFoundError('User was not found.') // message is optional
  }

  @Get('/translations/:language/:key')
  get( @Param('language') language: string, @Param('key') key: string) {
    return this.ts.getTranslation(key, language).toPromise()
  }

  @Post('/translations/:language/:key')
  post( @Param('language') language: string, @Param('key') key: string, @Body({ validate: true }) value: TheThing) {
    // console.log(value)
    return value
  }
}
