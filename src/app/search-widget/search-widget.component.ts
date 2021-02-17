import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {

  @Output() searchEvent = new EventEmitter();
  
  searchQuery = '';

  constructor(private searchService: NbSearchService, private router: Router) { 
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchQuery = data.term;
      })
  }

  ngOnInit(): void {
  }

}
