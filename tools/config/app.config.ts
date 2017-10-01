export interface EnvConfig {
  name: string
  description: string
  pageTitleSeparator: string
  host: string
  env?: string
  endpoints?: {
    api: string,
    websocketServer: string
  },
  og?: {
    defaultSocialImage?: string
    facebookAppId?: string
  }
}
