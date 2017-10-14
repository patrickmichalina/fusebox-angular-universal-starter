import { EnvironmentService } from './environment.service'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private env: EnvironmentService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // handles absolute http requests
    if (req.url.includes('http')) return next.handle(req)

    if (!this.env.config.endpoints || !this.env.config.endpoints.api) throw new Error('missing endpoint configuration value')

    // handles relative urls on node server
    if (req.url.includes('./')) {
      if (!this.env.config.host) throw new Error('missing host configuration value')
      return next.handle(req.clone({
        url: `${this.env.config.host}/${req.url.replace('./', '')}`
      }))
    }

    // handles entity requests to remote API
    return next.handle(req.clone({
      url: `${this.env.config.endpoints.api}/${req.url}`
    }))
  }
}
