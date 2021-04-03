// Server - CovidBit - Fast Pandas
// Created:               2021, Yevgeniya Anasheva

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("404 Error");
  }
  ngOnDestroy(): void {
    this.titleService.setTitle("Covidbit");
  }

}
