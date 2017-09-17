import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Home Page', () => {
  it('should have title', async () => {
    expect.assertions(1)

    const page = browser.goto(`${baseUrl}`)

    const text = await page.evaluate(() => document.title)

    expect(text).toContain('Home - Fusebox Angular Universal Starter')
  })
})
