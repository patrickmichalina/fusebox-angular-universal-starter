import { EnvConfig } from '../config/app.config';

const BaseConfig: EnvConfig = {
  name: "Fusebox Angular Universal Starter",
  description: "Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator. Created by Patrick Michalina",
  pageTitleSeparator: " - ",
  endpoints: {
    api: 'http://localhost:8000/api'
  },
  og: {
    defaultSocialImage: "https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/android-chrome-512x512.png",
    facebookAppId: "117309532219749"
  },
  host: 'http://localhost:8000',
  socketHost: 'ws://localhost:8001'
};

export = BaseConfig;