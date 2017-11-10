import { makeStateKey, TransferState } from '@angular/platform-browser'
import { Injectable, InjectionToken, NgZone } from '@angular/core'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { fbAdminDb } from './server'
import { database } from 'firebase-admin'

export const FIREBASE_ADMIN_INSTANCE = new InjectionToken<string>('app.fb.admin')

@Injectable()
export class FirebaseAdminService {
  constructor(private zone: NgZone, private ts: TransferState) { }

  public object(path: any, query?: any) {
    return {
      valueChanges: () => {
        const timeout = setTimeout(() => undefined, 10000)
        return fromPromise(new Promise<any>((resolve, reject) => {
          this.zone.runOutsideAngular(() => { // Out of Angular's zone so it doesn't wait for the neverending socket connection to end.
            const ref = this.applyQuery(fbAdminDb.ref(path), query)
            ref.once('value').then((data: any) => {
              this.zone.run(() => { // Back in Angular's zone
                this.ts.set(makeStateKey<string>(`FB.${path}`), data.val())
                resolve(data.val())
                setTimeout(() => {
                  // Maybe getting the data will result in more components to the view that need related data.
                  // 20ms should be enough for those components to init and ask for more data.
                  clearTimeout(timeout)
                }, 20)
              })
            }, (err: any) => {
              setTimeout(() => {
                reject(err)
                clearTimeout(timeout)
              }, 20)
            })
          })
        }))
      }
    }
  }

  public list(path: any, query?: any) {
    return {
      valueChanges: () => {
        const timeout = setTimeout(() => undefined, 10000)
        return fromPromise(new Promise<any>((resolve, reject) => {
          this.zone.runOutsideAngular(() => { // Out of Angular's zone so it doesn't wait for the neverending socket connection to end.
            query(fbAdminDb.ref(path)).once('value').then((snapshot: database.DataSnapshot) => {
              this.zone.run(() => { // Back in Angular's zone
                const res = snapshot.val()
                const projected = Object.keys(res || {}).map(key => res[key])
                this.ts.set(makeStateKey<string>(`FB.${path}`), projected)
                resolve(projected)
                setTimeout(() => {
                  // Maybe getting the data will result in more components to the view that need related data.
                  // 20ms should be enough for those components to init and ask for more data.
                  clearTimeout(timeout)
                }, 20)
              })
            }, (err: any) => {
              setTimeout(() => {
                reject(err)
                clearTimeout(timeout)
              }, 20)
            })
          })
        }))
      },
      snapshotChanges: () => {
        const timeout = setTimeout(() => undefined, 10000)
        return fromPromise(new Promise<any>((resolve, reject) => {
          this.zone.runOutsideAngular(() => { // Out of Angular's zone so it doesn't wait for the neverending socket connection to end.
            query(fbAdminDb.ref(path)).once('value').then((snapshot: database.DataSnapshot) => {
              this.zone.run(() => { // Back in Angular's zone
                const res = snapshot.val()
                const projected = Object.keys(res || {}).map(key => ({ ...res[key], id: key }))
                this.ts.set(makeStateKey<string>(`FB.${path}`), projected)
                resolve(projected)
                setTimeout(() => {
                  // Maybe getting the data will result in more components to the view that need related data.
                  // 20ms should be enough for those components to init and ask for more data.
                  clearTimeout(timeout)
                }, 20)
              })
            }, (err: any) => {
              setTimeout(() => {
                reject(err)
                clearTimeout(timeout)
              }, 20)
            })
          })
        }))
      }
    }
  }

  applyQuery(ref: any, query: any) {
    // tslint:disable-next-line:forin
    for (const n in query) {
      const val = query[n].getValue
        ? query[n].getValue() // BehaviorSubject
        : query[n] // Primitive
      switch (n) {
        case 'orderByKey':
          ref = ref.orderByKey()
          break
        default:
          if (!(n in ref)) {
            break
          }
          ref = ref[n](val)
          break
      }
    }
    return ref
  }
}
