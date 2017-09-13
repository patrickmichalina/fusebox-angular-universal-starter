export interface EnvConfig {
  name: string
  description: string
  pageTitleSeparator: string
  host: string
  env?: string
  endpoints?: {
    api?: string
  },
  og?: {
    defaultSocialImage?: string
    facebookAppId?: string
  }
}
