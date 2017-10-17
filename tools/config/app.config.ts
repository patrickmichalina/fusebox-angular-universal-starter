export interface EnvConfig {
  name: string,
  description: string,
  firebase: {
    appName: string
    config: {
      apiKey: string
      authDomain: string
      databaseURL: string
      projectId: string
      storageBucket: string
      messagingSenderId: string
    }
  }
  host: string
  env?: string
  endpoints?: {
    api: string,
    websocketServer: string
  }
}
