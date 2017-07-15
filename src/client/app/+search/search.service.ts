import { Observable } from 'rxjs/Observable';
import { TransferHttp } from './../shared/transfer-http/transfer-http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

export interface ISearchService {
  search(search?: string, sort?: string, order?: string): Observable<any>;
}

@Injectable()
export class SearchService implements ISearchService {
  private url = 'https://api.github.com/search/repositories';
  
  constructor(private http: TransferHttp) { }

  public search(search: string = 'Angular+stars:>1000', sort?: string, order?: string): Observable<any> {
    const params = new URLSearchParams();
    
    if(search) params.set('q', search);
    if(sort) params.set('sort', sort);
    if(order) params.set('order', order);

    return this.http.get(this.url + `?${params.toString()}`);
  }
}