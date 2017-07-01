import { writeFile } from 'fs';
const SitemapGenerator = require('sitemap-generator');

export const sitemap = (host: string) => new Promise<string>((resolve, reject) => {
  const generator = new SitemapGenerator(host);

  generator.on('done', (sitemaps: string[]) => {
    writeFile('dist/sitemap.xml', sitemaps[0], () => {
      console.log(`Generated sitemap.xml`)
      return resolve(sitemaps[0]);
    });
  });

  generator.on('clienterror', () => {
    return reject();
  });

  generator.start();
})


