import { Component, OnInit, Output } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { DataService  } from '../data/data.service'
import { BusinessName } from '../models/businessName.model';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {

  //@Output() searchSubmitted = new EventEmitter();

  searchQuery = '';
  businessName: BusinessName = {name: ''};

  constructor(private searchService: NbSearchService, public data: DataService) { 
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchQuery = data.term;
        this.businessName.name = this.searchQuery;
        this.data.searchUser(this.businessName);
      })
  }

  onSubmit(value: string) {
    // code
    //this.searchService.search(value);
  }

  ngOnInit(): void {
  }

}
