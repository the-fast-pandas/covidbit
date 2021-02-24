import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { DataService  } from '../data/data.service'

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {

  @Output() searchEvent = new EventEmitter();
  
  searchQuery = '';

  constructor(private searchService: NbSearchService, public data: DataService) { 
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchQuery = data.term;
        this.data.getUserView();
      })
  }

  ngOnInit(): void {
  }

}
