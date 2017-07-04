import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { EnvironmentService } from './shared/services/environment.service';

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(environmentService: EnvironmentService, meta: Meta) {
    meta.addTag({ property: 'fb:app_id', content: environmentService.config.og.facebookAppId })
  }
}
