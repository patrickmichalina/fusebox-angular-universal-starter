import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Signup Page', () => {
  it('should have title', async () => {
    const page = browser.goto(`${baseUrl}/signup`)

    const text = await page.evaluate(() => document.title)
      .end()

    expect(text).toContain('Signup - Fusebox Angular Universal Starter')
  })
})
