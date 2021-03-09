// Server - CovidBit - Fast Pandas
// Created: 08, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Terms and Conditions");
  }
  ngOnDestroy(): void {
    this.titleService.setTitle("Covidbit");
  }

}
