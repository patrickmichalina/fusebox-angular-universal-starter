import { EnvironmentService, IEnvironmentService } from './environment.service';
import { TestBed, async } from '@angular/core/testing';
import { ENV_CONFIG, FuseBoxEnvConfig } from '../../app.config';

describe(EnvironmentService.name, () => {

  it('should construct', async(() => {
    TestBed.configureTestingModule({
      providers: [
        EnvironmentService,
        { provide: ENV_CONFIG, useValue: FuseBoxEnvConfig }
      ]
    });
    const service = TestBed.get(EnvironmentService) as IEnvironmentService;
    expect(service).not.toBeNull();
  }));
});