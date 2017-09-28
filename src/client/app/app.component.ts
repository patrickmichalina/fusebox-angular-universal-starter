import { WebSocketService } from './shared/services/web-socket.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'
import { EnvironmentService } from './shared/services/environment.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2'

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(env: EnvironmentService, meta: Meta, analytics: Angulartics2GoogleAnalytics, private wss: WebSocketService) {
    if (env.config.og && env.config.og.facebookAppId) {
      meta.addTag({ property: 'fb:app_id', content: env.config.og.facebookAppId })
    }
    this.wss.messageBus$.subscribe()
    this.wss.send({ message: 'ws test' })
  }
}
