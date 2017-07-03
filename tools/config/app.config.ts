export interface IConfig {
  name: string;
  description: string;
  pageTitleSeparator: string;
  og: {
    defaultSocialImage: string,
  }
  server: {
    host: string;
    port: number;
    minifyIndex: boolean;
  }
}
