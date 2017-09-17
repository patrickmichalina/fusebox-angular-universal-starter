import { baseUrl, browser } from '../../../../tools/test/jest.e2e-setup'

describe('Login Page', () => {
  it('should have title', async () => {
    expect.assertions(1)

    const page = browser.goto(`${baseUrl}/login`)

    const text = await page.evaluate(() => document.title)

    expect(text).toContain('Login - Fusebox Angular Universal Starter')
  })
})
