// Server - CovidBit - Fast Pandas
// Created: 08, March, 2021, Teresa Costa

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-policy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Privacy Policy");
  }
  ngOnDestroy(): void {
    this.titleService.setTitle("Covidbit");
  }

}
