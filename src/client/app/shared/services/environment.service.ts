import { Inject, Injectable } from '@angular/core'
import { ENV_CONFIG } from '../../app.config'
import { EnvConfig } from '../../../../../tools/config/app.config'

export interface IEnvironmentService {
  config: EnvConfig
}

@Injectable()
export class EnvironmentService implements IEnvironmentService {
  constructor(@Inject(ENV_CONFIG) private _config: any) { }
  get config(): EnvConfig {
    return this._config
  }
}
