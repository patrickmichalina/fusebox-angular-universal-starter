import { Injectable } from '@angular/core'

export interface IMinifierService {
  css(css: string): string
}

@Injectable()
export class MinifierService implements IMinifierService {
  css(css: string): string {
    return css
  }
}
