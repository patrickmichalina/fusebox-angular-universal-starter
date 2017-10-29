import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'pmKeys' })
export class KeysPipe implements PipeTransform {
  public transform(value: { [key: string]: any }): string[] {
    return Object.keys(value || {})
  }
}
