import { browser } from 'protractor'

describe('Admin', () => {

  beforeEach(async () => {
    return await browser.get('/admin')
  })

  it('should have correct feature heading', () => {
    expect(browser.getTitle()).toEqual('Admin - Fusebox Angular Universal Starter')
  })

})
