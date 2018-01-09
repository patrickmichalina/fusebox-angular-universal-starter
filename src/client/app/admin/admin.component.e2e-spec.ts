import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Admin Page', () => {
  it('should have title', async () => {
    expect.assertions(1)
    const page = browser.goto(`${baseUrl}/admin`)

    const text = await page.evaluate(() => document.title)

    expect(text).toEqual('Admin - Fusebox Angular Universal Starter')
  })
})
