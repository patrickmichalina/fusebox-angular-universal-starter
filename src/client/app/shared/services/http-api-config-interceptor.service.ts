import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class HttpApiConfigInterceptor implements HttpInterceptor {

  constructor(private env: EnvironmentService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.env.config.endpoints && this.env.config.endpoints.api && !req.url.includes('http')) {
      return next.handle(req.clone({
        url: `${this.env.config.endpoints.api}/${req.url}`,
        withCredentials: true
      }));
    }

    return next.handle(req);
  }
}
