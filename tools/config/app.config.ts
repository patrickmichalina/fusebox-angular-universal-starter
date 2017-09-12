export interface EnvConfig {
  name: string
  description: string
  pageTitleSeparator: string
  endpoints?: {
    api?: string
  },
  og: {
    defaultSocialImage: string
    facebookAppId: string
  }
  host: string
  server: {
    host: string
    port: number
    minifyIndex: boolean
    prodMode?: boolean
  },
  env?: string
}
