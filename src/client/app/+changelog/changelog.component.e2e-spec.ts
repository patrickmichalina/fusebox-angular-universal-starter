import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Changelog Page', () => {
  it('should have title', async () => {
    const page = browser.goto(`${baseUrl}/changelog`)

    const text = await page.evaluate(() => document.title)
      .end()

    expect(text).toContain('Changelog - Fusebox Angular Universal Starter')
  })
})
