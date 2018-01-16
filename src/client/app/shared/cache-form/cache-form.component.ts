import { Subscription } from 'rxjs/Subscription'
import { FormControl, FormGroup } from '@angular/forms'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
// tslint:disable-next-line:no-require-imports
import ms = require('ms')

@Component({
  selector: 'pm-cache-form',
  templateUrl: './cache-form.component.html',
  styleUrls: ['./cache-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CacheFormComponent implements OnDestroy, OnInit {
  private _cache: { [key: string]: boolean | number | string }
  @Input() set cache(val: any) {
    this._cache = val
  }
  get cache() {
    return this._cache || {}
  }
  @Output() cacheChange = new EventEmitter<{ [key: string]: boolean | number | string }>()
  @Output() cacheStringChange = this.cacheChange.asObservable()
    .scan((acc: string, value) => Object.keys(value).map(a => {
      return typeof value[a] === 'number' || typeof value[a] === 'string'
        ? `${a}=${value[a]}`
        : a
    }).join(', '), '')

  public form: FormGroup
  private sub = new Subscription()
  private readonly staticDirectives: ReadonlyArray<{ readonly key: string, readonly hasInput?: boolean }> = [
    { key: 'no-cache' },
    { key: 'no-store' },
    { key: 'no-transform' },
    { key: 'only-if-cached' },
    { key: 'must-revalidate' },
    { key: 'public' },
    { key: 'private' },
    { key: 'proxy-revalidate' },
    { key: 'max-age', hasInput: true },
    { key: 's-maxage', hasInput: true },
    { key: 'max-stale', hasInput: true },
    { key: 'min-fresh', hasInput: true }
  ]

  public readonly dirsNoInput: ReadonlyArray<{ readonly key: string, readonly hasInput?: boolean, readonly inputKey?: string }> =
    this.staticDirectives
      .filter(a => !a.hasInput)

  public readonly dirsWithInput = this.staticDirectives
    .filter(a => a.hasInput)
    .map(a => ({ ...a, inputKey: this.getInputKey(a.key) }))

  getInputKey(key: string) {
    return `${key}-input`
  }

  removeInputKey(key: string) {
    return key.replace('-input', '')
  }

  ngOnInit() {
    this.form = new FormGroup(this.staticDirectives.reduce((a, c) => {
      if (!c.hasInput) return ({ ...a, [c.key]: new FormControl(this.cache[c.key], []) })
      return {
        ...a,
        [c.key]: new FormControl(this.cache[c.key], []),
        [this.getInputKey(c.key)]: new FormControl(this.cache[c.key], [])
      }
    }, {}))

    this.sub = this.form.valueChanges
      .scan((acc, value) => Object.keys(value)
        .filter(a => value[a])
        .reduce((a, c) => {
          if (typeof value[c] === 'string' && !value[this.removeInputKey(c)]) return ({ ...a })
          return typeof value[c] === 'string'
            ? { ...a, [this.removeInputKey(c)]: this.compute(value[c]).toString() }
            : { ...a, [c]: value[c] }
        }, {}), {})
      .subscribe(res => this.cacheChange.next(res))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  compute(entry: string): number {
    if (!isNaN(+entry)) return +entry
    try {
      return ms(entry) / 1000
    } catch (err) {
      return 0
    }
  }

  trackByDirsNoInput(index: number, item: any) {
    return index
  }

  trackByDirsWithInput(index: number, item: any) {
    return index
  }
}
