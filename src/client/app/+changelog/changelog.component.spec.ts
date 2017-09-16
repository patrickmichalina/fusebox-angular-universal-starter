import { Observable } from 'rxjs/Observable'
import { By } from '@angular/platform-browser'
import { HttpClientModule, HttpHandler, HttpResponse } from '@angular/common/http'
import { ChangelogComponent } from './changelog.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { ChangelogModule } from './changelog.module'
import '../../operators'

describe(ChangelogComponent.name, () => {
  let fixture: ComponentFixture<ChangelogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChangelogModule, HttpClientModule],
      declarations: [TestComponent]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangelogComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))

  // tslint:disable:max-line-length
  it('should render changelog', async(() => {
    const handler = TestBed.get(HttpHandler) as MockHttpHandler
    const body =
      `
    ### Bug Fixes
    * **component:** allow global 301 no video page ([#496](https://github.com/flocasts/flosports-webapp/issues/496)) ([af449ff](https://github.com/flocasts/flosports-webapp/commit/af449ff))
    ### Features
    * **service:** handle X-301-Location content redirection ([#493](https://github.com/flocasts/flosports-webapp/issues/493)) ([fc57722](https://github.com/flocasts/flosports-webapp/commit/fc57722))
    * **service:** introduce global header interceptor ([#495](https://github.com/flocasts/flosports-webapp/issues/495)) ([05680bc](https://github.com/flocasts/flosports-webapp/commit/05680bc))
    * **service:** preserve queryParams in funnel guards ([#468](https://github.com/flocasts/flosports-webapp/issues/468)) ([b9cfea1](https://github.com/flocasts/flosports-webapp/commit/b9cfea1))
    `

    handler.value = new HttpResponse({
      status: 200,
      body
    })
    fixture.detectChanges()
    expect(fixture.nativeElement).toMatchSnapshot()
  }))

  it('should handle failure to load file gracefully', async(() => {
    const handler = TestBed.get(HttpHandler) as MockHttpHandler
    handler.throw = true
    fixture.detectChanges()
    const p = fixture.debugElement.query(By.css('div'))
    expect(p).toBeTruthy()
    expect(p.nativeElement.textContent).toBeTruthy()
    expect(((p.nativeElement as HTMLDivElement).textContent as string).replace(/\r?\n|\r/g, '')).toEqual('Error loading changelog.md')
    expect(fixture.nativeElement).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-changelog></pm-changelog>'
})
class TestComponent {}

class MockHttpHandler {
  value: any
  throw = false
  handle(req: any) {
    if (this.throw) return Observable.throw('')
    return Observable.of(this.value)
  }
}
