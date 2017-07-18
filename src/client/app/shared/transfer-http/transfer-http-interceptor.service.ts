import { TransferState } from './../transfer-state/transfer-state';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class HttpStateTransferInterceptor implements HttpInterceptor {

  constructor(private transferState: TransferState) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cacheValue = this.transferState.get(this.createCacheKey(req));

    if (cacheValue) {
      const cachedResponse = new HttpResponse({
        body: cacheValue,
        status: 200
      });
      return Observable.of(cachedResponse);
    }

    return next.handle(req).map(event => {
      if (event instanceof HttpResponse) {
        this.transferState.set(this.createCacheKey(req), event.body);
      }
      return event;
    });
  }

  createCacheKey(req: HttpRequest<any>): string {
    return `${req.urlWithParams}_${req.method}`;
  }
}
