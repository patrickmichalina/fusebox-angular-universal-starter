import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Search Page', () => {
  it('should have title', async () => {
    const page = browser.goto(`${baseUrl}/search`)

    const text = await page.evaluate(() => document.title)
      .end()

    expect(text).toContain('Search - Fusebox Angular Universal Starter')
  })
})
