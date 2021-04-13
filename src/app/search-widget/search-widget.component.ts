// Server - CovidBit - Fast Pandas
// Created: 20, February, 2021, Yevgeniya Anasheva
// Modified: 01, March, 2021, Teresa Costa, backend integration

import { Component, OnInit} from '@angular/core';
import { NbSearchService } from '@nebular/theme';
// Local Services
import { DataService  } from '../services/data-services/data.service'
import { BusinessName } from '../models/businessName.model';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {

  searchQuery: any = myGlobals.emptyField;
  businessName: BusinessName = { name: myGlobals.emptyField };

  constructor(private searchService: NbSearchService, public data: DataService) { 
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchQuery = data.term;
        this.businessName.name = this.searchQuery;
        this.data.searchUser(this.businessName);
        sessionStorage.setItem('reload', "true");

      })
  }

  ngOnInit(): void {}

}
