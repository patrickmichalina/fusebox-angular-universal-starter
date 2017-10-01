import { testApi } from '../test-helper'
import { SettingsController } from './settings.controller'

describe(SettingsController.name, () => {
  it('should get settings object', () => {
    return testApi.get('/api/settings')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
})
