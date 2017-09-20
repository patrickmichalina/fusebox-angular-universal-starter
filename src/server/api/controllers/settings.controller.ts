import { Get, JsonController } from 'routing-controllers'

@JsonController()
export class SettingsController {

  @Get('/settings')
  getAll() {
    return Promise.resolve({ some: 'name' })
  }
}
