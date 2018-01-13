import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'pmKeyVal' })
export class KeyValuePipe implements PipeTransform {
  public transform(value: { readonly [key: string]: any }): ReadonlyArray<{ readonly key: string, readonly value: any }> {
    return Object.keys(value || {}).map(key => ({ key, value: value[key] }))
  }
}
