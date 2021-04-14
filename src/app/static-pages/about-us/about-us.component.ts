// Server - CovidBit - Fast Pandas
// Created: 15, March, 2021, Teresa Costa
// Modified: 01, April, 2021, Adilah 

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("About Us");
  }
  ngOnDestroy(): void {
    this.titleService.setTitle("Covidbit");
  }

}
