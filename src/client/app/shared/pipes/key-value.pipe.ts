import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'pmKeyVal' })
export class KeyValuePipe implements PipeTransform {
  public transform(value: { [key: string]: any }): { key: string, value: any }[] {
    return Object.keys(value || {}).map(key => ({ key, value: value[key] }))
  }
}
