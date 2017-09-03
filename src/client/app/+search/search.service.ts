import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

export interface ISearchService {
  search(search?: string, sort?: string, order?: string): Observable<any>
}

@Injectable()
export class SearchService implements ISearchService {
  private url = 'https://api.github.com/search/repositories'

  constructor(private http: HttpClient) { }

  public search(search = 'Angular+stars:>1000', sort = '', order = ''): Observable<any> {
    const params = new HttpParams()
      .set('q', search)
      .set('sort', sort)
      .set('order', order)

    return this.http.get(this.url, { withCredentials: false, params  })
  }
}
