import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

@Injectable()
export class MockFirebaseDatabaseService {
  get() {
    return of('test')
  }
  getList() {
    return of([])
  }
  getListKeyed() {
    return of([])
  }
}
