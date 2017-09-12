import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangelogComponent {
  changelog$ = this.http.get('./changelog.md', { responseType: 'text' })
    .catch(a => Observable.of('Error loading changelog.md'))

  constructor(private http: HttpClient) { }
}
