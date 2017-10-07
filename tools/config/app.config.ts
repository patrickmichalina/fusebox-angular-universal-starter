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
  },
  firebase: {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
  }
}
