import { InjectionToken } from '@angular/core'
import { EnvConfig } from '../../../tools/config/app.config'

export const ENV_CONFIG = new InjectionToken<EnvConfig>('app.config')
