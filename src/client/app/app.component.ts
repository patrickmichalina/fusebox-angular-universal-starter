import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { EnvironmentService } from './shared/services/environment.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(environmentService: EnvironmentService, meta: Meta, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    meta.addTag({ property: 'fb:app_id', content: environmentService.config.og.facebookAppId })
  }
}
