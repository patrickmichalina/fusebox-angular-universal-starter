import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'pm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public $results = this.searchService.search().share();
  public $items = this.$results.map(a => a.items);
  public $count = this.$results.map(a => a.total_count);

  constructor(private searchService: SearchService) { }
}
