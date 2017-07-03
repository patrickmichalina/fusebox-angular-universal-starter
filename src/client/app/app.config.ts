declare var __process_env__: EnvConfig;

import { InjectionToken } from '@angular/core';
import { EnvConfig } from '../../../tools/config/app.config';

export const ENV_CONFIG = new InjectionToken<EnvConfig>('app.config');
export const FuseBoxEnvConfig = __process_env__;