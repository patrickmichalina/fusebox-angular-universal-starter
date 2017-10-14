import { EnvironmentService, IEnvironmentService } from './environment.service'
import { async, TestBed } from '@angular/core/testing'
import { ENV_CONFIG } from '../../app.config'

describe(EnvironmentService.name, () => {
  let service: IEnvironmentService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        EnvironmentService,
        { provide: ENV_CONFIG, useValue: { someValue: 1 } }
      ]
    })
  }))

  beforeEach(() => {
    service = TestBed.get(EnvironmentService)
  })

  afterEach(() => {
    TestBed.resetTestingModule()
  })

  it('should construct', async(() => {
    expect(service).toBeDefined()
  }))

  it('should return config', async(() => {
    expect(service.config).toEqual({
      someValue: 1
    })
  }))
})
