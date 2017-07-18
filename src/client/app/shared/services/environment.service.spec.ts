import { EnvironmentService, IEnvironmentService } from './environment.service';
import { async, TestBed } from '@angular/core/testing';
import { ENV_CONFIG, FuseBoxEnvConfig } from '../../app.config';

describe(EnvironmentService.name, () => {
  let service: IEnvironmentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        EnvironmentService,
        { provide: ENV_CONFIG, useValue: FuseBoxEnvConfig }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(EnvironmentService);
  });

  it('should construct', async(() => {
    expect(service).not.toBeNull();
  }));
});
