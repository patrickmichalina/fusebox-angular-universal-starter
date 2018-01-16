import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'pmKeys' })
export class KeysPipe implements PipeTransform {
  public transform(value: { readonly [key: string]: any }): ReadonlyArray<string> {
    return Object.keys(value || {})
  }
}
