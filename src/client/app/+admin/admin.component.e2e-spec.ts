import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Admin Page', () => {

  test('should have title', async () => {
    const page = browser.goto(`${baseUrl}/admin`)

    const text = await page.evaluate(() => document.title)
      .end()

    expect(text).toEqual('Admin - Fusebox Angular Universal Starter')
  })

})
