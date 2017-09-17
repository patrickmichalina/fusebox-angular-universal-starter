import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('About Page', () => {
  it('should have title', async () => {
    const page = browser.goto(`${baseUrl}/about`)

    const text = await page.evaluate(() => document.title)
      .end()

    expect(text).toContain('About - Fusebox Angular Universal Starter')
  })
})
