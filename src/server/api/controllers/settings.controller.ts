import { Get, JsonController } from 'routing-controllers'
import { SettingService } from '../services'

@JsonController()
export class SettingsController {
  constructor(private settingService: SettingService) { }

  /**
   * @swagger
   * /api/settings:
   *   get:
   *     description: get the site settings
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Get('/settings')
  get() {
    return this.settingService.settings$.take(1).toPromise()
  }
}
