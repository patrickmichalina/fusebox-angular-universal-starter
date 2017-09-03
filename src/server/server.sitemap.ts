// tslint:disable:no-require-imports

import { writeFile } from 'fs'
const sitemapGenerator = require('sitemap-generator')

export const sitemap = (host: string) => new Promise<string>((resolve, reject) => {
  const generator = new sitemapGenerator(host)

  // Avoid infinite loop during initial creation
  generator.crawler.addFetchCondition((parsedUrl: any) => {
    return !parsedUrl.url.includes('sitemap.xml')
  })

  // TODO: this isn't working!
  // generator.crawler.on('fetchconditionerror', (queueItem: any) => {
  //   add back into sitemap stack
  // });

  generator.on('done', (sitemaps: string[]) => {
    if (sitemaps && sitemaps[0]) {
      writeFile('dist/sitemap.xml', sitemaps[0], () => {
        console.log('Generated sitemap.xml')
        return resolve(sitemaps[0])
      })
    } else {
      return reject('Failed to generate sitemap.xml')
    }
  })

  generator.on('clienterror', (err: any) => {
    return reject(err)
  })

  console.log(`starting sitemap crawler on ${host}`)
  generator.start()
})
