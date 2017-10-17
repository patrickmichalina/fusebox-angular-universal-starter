import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { makeStateKey, TransferState } from '@angular/platform-browser'

@Injectable()
export class FirebaseDatabaseService {
  constructor(private db: AngularFireDatabase, private ts: TransferState) { }

  get<T>(path: string) {
    const cached = this.ts.get<T | undefined>(this.cacheKey(path), undefined)
    return cached
      ? this.db.object(path).valueChanges<T>().startWith(cached)
      : this.db.object(path).valueChanges<T>()
  }

  cacheKey(path: string) {
    return makeStateKey<string>(`FB.${path}`)
  }
}
