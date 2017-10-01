import { EnvironmentService } from './environment.service'
import { Subject } from 'rxjs/Subject'
import { PlatformService } from './platform.service'
import { Injectable } from '@angular/core'
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject'

@Injectable()
export class WebSocketService {
  private source = this.ps.isBrowser && typeof window !== 'undefined' && (window as any).WebSocket &&
    this.es.config.endpoints && this.es.config.endpoints.websocketServer
    ? new WebSocketSubject(
      {
        url: this.es.config.endpoints.websocketServer
      } as WebSocketSubjectConfig
    )
    : new Subject()

  public messageBus$ = this.source.asObservable()

  constructor(private ps: PlatformService, private es: EnvironmentService) { }

  send(obj: Object) {
    this.source.next(JSON.stringify(obj))
  }
}
