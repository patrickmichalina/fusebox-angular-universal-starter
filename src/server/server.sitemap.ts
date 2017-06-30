import { writeFile } from 'fs';
const SitemapGenerator = require('sitemap-generator');

export const sitemap = (host: string) => {
  const generator = new SitemapGenerator(host);

  generator.on('done', (sitemaps: any[]) => {
    writeFile('dist/sitemap.xml', sitemaps[0], () => console.log(`Generated sitemap.xml`));
  });

  generator.start();
}


