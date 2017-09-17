import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Login Page', () => {
  it('should have title', async () => {
    const page = browser.goto(`${baseUrl}/login`)

    const text = await page.evaluate(() => document.title)
      .end()

    expect(text).toContain('Login - Fusebox Angular Universal Starter')
  })
})
