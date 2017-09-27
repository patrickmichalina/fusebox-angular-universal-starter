import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchService } from './search.service'

@Component({
  selector: 'pm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  public $results = this.searchService.search()
  public $items = this.$results.map((a: any) => a.items)
  public $count = this.$results.map((a: any) => a.total_count)

  constructor(private searchService: SearchService) { }
}
