import { testApi } from './test-helper'

describe('API Server', () => {
  it('should have swagger.json route', () => {
    return testApi.get('/api-docs.json')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should have swagger docs route', () => {
    return testApi.get('/api-docs/')
      .expect(200)
      .expect('Content-Type', /html/)
  })
})
