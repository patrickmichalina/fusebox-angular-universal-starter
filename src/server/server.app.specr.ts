const request = require('supertest')
import { app } from './server.app';
import { EnvConfig } from '../../tools/config/app.config'

const config: EnvConfig = {
  name: "Fusebox Angular Universal Starter",
  description: "Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator. Created by Patrick Michalina",
  pageTitleSeparator: " - ",
  endpoints: {
    api: 'http://localhost:1338/api'
  },
  og: {
    defaultSocialImage: "https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/android-chrome-512x512.png",
    facebookAppId: "117309532219749"
  },
  server: {
    host: "http://localhost",
    port: 8001,
    minifyIndex: false
  }
}

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app(config)).get("/").then((response: any) => {
      expect(response.statusCode).toBe(200)
    })
  });
})