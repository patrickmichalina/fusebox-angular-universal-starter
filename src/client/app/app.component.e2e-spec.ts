import { baseUrl, browser } from '../../../tools/test/jest.e2e-setup'

describe('App', () => {
  it('should load Angular', () => {
    // tslint:disable-next-line:readonly-array
    const responses: { originalURL: string, httpResponseCode: number }[] = []

    return (browser as any)
      .on('did-get-response-details', (event: any, status: boolean, newURL: string, originalURL: string,
        httpResponseCode: number, requestMethod: string, referrer: string, headers: Object, resourceType: string) => {
        responses.push({ originalURL, httpResponseCode })
      })
      .goto(`${baseUrl}`)
      .end()
      .then(() => {
        const loadedResponses = responses.filter(a => a.httpResponseCode === 200)
        expect(loadedResponses.some(a => RegExp('app').test(a.originalURL))).toBeTruthy()
        expect(loadedResponses.some(a => RegExp('vendors').test(a.originalURL))).toBeTruthy()
      })
  })
})
