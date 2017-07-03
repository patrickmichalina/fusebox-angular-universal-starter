import { IConfig } from '../config/app.config';

const BaseConfig: IConfig = {
  name: "Fusebox Angular Universal Starter",
  description: "Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator.",
  pageTitleSeparator: " - ",
  og: {
    defaultSocialImage: "https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/apple-touch-startup-image-1536x2008.png"
  },
  server: {
    host: "http://localhost",
    port: 8083,
    minifyIndex: true
  }
};

export = BaseConfig;