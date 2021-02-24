import { Component, OnInit, Output } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { Router } from '@angular/router';
import { SearchManagerService } from '../search-manager.service';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {

  //@Output() searchSubmitted = new EventEmitter();

  searchQuery = '';

  constructor(private searchService: NbSearchService, private router: Router) { 
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchQuery = data.term;
      })
  }

  onSubmit(value: string) {
    // code
    //this.searchService.search(value);
  }

  ngOnInit(): void {
  }

}
