import { PlatformService } from './../services/platform.service'
import { InjectionService } from './../services/injection.service'
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, Renderer2, ViewChild } from '@angular/core'
import * as Quill from 'quill'

@Component({
  selector: 'pm-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuillEditorComponent implements AfterViewInit {
  @ViewChild('editor') editorContainer: any
  @Input() content: string
  quill: Quill.Quill

  constructor(injector: InjectionService, renderer: Renderer2, private ps: PlatformService) {
    injector.injectCollection(renderer, [
      {
        element: 'link',
        inHead: true,
        attributes: {
          rel: 'stylesheet',
          href: 'https://cdn.quilljs.com/1.0.0/quill.snow.css'
        }
      }
    ])
  }

  ngAfterViewInit() {
    if (this.ps.isServer) return
    // tslint:disable-next-line:no-require-imports
    const _quill = require('quill')
    this.quill = new _quill(this.editorContainer.nativeElement, {
      modules: { toolbar: [['bold', 'italic'], ['link', 'image']] },
      theme: 'snow'
    })

    this.quill.on('text-change', console.log)
  }
}
