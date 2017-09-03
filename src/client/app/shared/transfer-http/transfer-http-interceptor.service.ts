import { TransferState } from './../transfer-state/transfer-state'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'

@Injectable()
export class HttpStateTransferInterceptor implements HttpInterceptor {

  constructor(private transferState: TransferState) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cachedHttpEvent = this.transferState.get(this.createCacheKey(req))

    if (cachedHttpEvent) {
      if (cachedHttpEvent.status < 200 || cachedHttpEvent.status >= 300) {
        const err = cachedHttpEvent as HttpErrorResponse
        const cachedErrorResponse = new HttpErrorResponse({
          status: err.status,
          statusText: err.statusText,
          error: err.error
        })
        return Observable.throw(cachedErrorResponse)
      } else {
        const response = cachedHttpEvent as HttpResponse<any>
        const cachedResponse = new HttpResponse({
          body: response.body,
          status: response.status,
          statusText: response.statusText
        })
        return Observable.of(cachedResponse)
      }
    }

    return next.handle(req).map(event => {
      if (event instanceof HttpResponse) {
        this.transferState.set(this.createCacheKey(req), event)
      }
      return event
    })
  }

  createCacheKey(req: HttpRequest<any>): string {
    return `${req.urlWithParams}_${req.method}`
  }
}
