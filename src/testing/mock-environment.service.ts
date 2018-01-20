import { Injectable } from '@angular/core'
import { IEnvironmentService } from '../client/app/shared/services/environment.service'

@Injectable()
export class MockEnvironmentService implements IEnvironmentService {
  config: any = {}
}
