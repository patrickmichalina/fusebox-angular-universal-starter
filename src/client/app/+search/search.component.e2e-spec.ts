import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Search Page', () => {
  it('should have title', async () => {
    expect.assertions(1)

    const page = browser.goto(`${baseUrl}/search`)

    const text = await page.evaluate(() => document.title)

    expect(text).toContain('Search - Fusebox Angular Universal Starter')
  })
})
