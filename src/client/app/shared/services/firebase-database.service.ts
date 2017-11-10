import { PlatformService } from './platform.service'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { makeStateKey, TransferState } from '@angular/platform-browser'
import { database } from 'firebase'
import { PathReference } from 'angularfire2/database/interfaces'

@Injectable()
export class FirebaseDatabaseService {
  constructor(private db: AngularFireDatabase, private ts: TransferState, private ps: PlatformService) { }

  get<T>(path: string) {
    const cached = this.ts.get<T | undefined>(this.cacheKey(path), undefined)
    return cached
      ? this.db.object(path).valueChanges<T>().startWith(cached).catch(err => Observable.of(undefined))
      : this.db.object(path).valueChanges<T>().catch(err => Observable.of(undefined))
  }

  getList<T>(path: PathReference, queryFn?: (ref: database.Reference) => database.Query): Observable<T[]> {
    const cached = this.ts.get<T[] | undefined>(this.cacheKey(path.toString()), undefined)
    return cached
      ? this.db.list(path, queryFn).valueChanges<T>().startWith(cached as any).catch(err => Observable.of([]))
      : this.db.list(path, queryFn).valueChanges<T>().catch(err => Observable.of([]))
  }

  getListKeyed<T>(path: PathReference, queryFn?: (ref: database.Reference) => database.Query): Observable<T[]> {
    const cached = this.ts.get<T[] | undefined>(this.cacheKey(path.toString()), undefined)
    return cached
      ? this.db.list(path, queryFn)
        .snapshotChanges()
        .map(a => this.keyMapper(a))
        .startWith(cached as any).catch(err => Observable.of([]))
      : this.db.list(path, queryFn)
        .snapshotChanges()
        .map(a => this.keyMapper(a))
        .catch(err => Observable.of([]))
  }

  keyMapper(res: any) {
    if (this.ps.isServer) return res
    return res.map((obj: any) => {
      return {
        id: obj.key,
        ...obj.payload.val()
      }
    })
  }

  getListRef<T>(path: PathReference, queryFn?: (ref: database.Reference) => database.Query) {
    return this.db.list<T>(path, queryFn)
  }

  getObjectRef<T>(path: string) {
    return this.db.object<T>(path)
  }

  cacheKey(path: string) {
    return makeStateKey<string>(`FB.${path}`)
  }
}
