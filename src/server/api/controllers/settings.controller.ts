import { Body, Get, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { SettingService } from '../services'
import { MinLength } from 'class-validator'

export class TheThing {
  @MinLength(6)
  password: string
}

@JsonController()
export class SettingsController {
  constructor(private ts: SettingService) { }

  @Get('/settings')
  getDictionary() {
    return this.ts.getDictionary().take(1).toPromise()
  }

  @Get('/settings/:language')
  getLanguageDictionary( @Param('language') language: string, @Param('key') key: string) {
    // return this.ts.getTranslation(key, language).toPromise()
    throw new NotFoundError('User was not found.') // message is optional
  }

  @Get('/settings/:language/:key')
  get( @Param('language') language: string, @Param('key') key: string) {
    return this.ts.getTranslation(key, language).toPromise()
  }

  @Post('/settings/:language/:key')
  post( @Param('language') language: string, @Param('key') key: string, @Body({ validate: true }) value: TheThing) {
    // console.log(value)
    return value
  }
}
