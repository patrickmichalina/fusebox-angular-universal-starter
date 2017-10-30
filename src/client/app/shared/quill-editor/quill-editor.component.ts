import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { PlatformService } from './../services/platform.service'
import { InjectionService } from './../services/injection.service'
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core'
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
  @Output() textValue = new BehaviorSubject<string>(this.content)
  @Output() onSelectionChange = new EventEmitter()
  @Output() onContentUpdated = new EventEmitter()

  private quill: Quill.Quill

  constructor(injector: InjectionService, renderer: Renderer2, private ps: PlatformService) {
  }

  get serverStyles() {
    return this.ps.isServer
      ? 'ql-container ql-snow ql-editor'
      : ''
  }

  ngAfterViewInit() {
    if (this.ps.isServer) return
    // tslint:disable-next-line:no-require-imports
    const _quill = require('quill')
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['code-block'],
      ['image'],
      ['video'],
      ['clean']                                         // remove formatting button
    ]
    this.quill = new _quill(this.editorContainer.nativeElement, {
      modules: { toolbar: toolbarOptions },
      theme: 'snow'
    })
    this.update()
    this.quill.on('text-change', () => {
      this.update()
    })
  }

  private update() {
    this.textValue.next(this.html)
  }

  get html() {
    return (this.quill as any).container.firstChild.innerHTML
  }
}
