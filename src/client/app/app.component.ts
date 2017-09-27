import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'
import { SettingService } from './shared/services/setting.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(ss: SettingService, meta: Meta, analytics: Angulartics2GoogleAnalytics) {
    ss.settings$.take(1).subscribe(s => {
      meta.addTag({ property: 'fb:app_id', content: s.tokens.facebookAppId })
    })
  }
}
