import { Get, JsonController } from 'routing-controllers'
import { SettingService } from '../services'

@JsonController()
export class SettingsController {
  constructor(private settingService: SettingService) { }

  /**
   * @swagger
   * tags:
   *   - name: settings
   *     description: operations on the application's settings
   */

  /**
   * @swagger
   * /api/settings:
   *   get:
   *     tags: [settings]
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
