// Server - CovidBit - Fast Pandas
// Created: 23, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import { DataService } from 'src/app/services/data-services/data.service';
import * as myGlobals from '../../../globals';
declare const formatDate: any;

@Component({
  selector: 'app-health-region-cases',
  templateUrl: './health-region-cases.component.html',
  styleUrls: ['./health-region-cases.component.scss']
})
export class HealthRegionCasesComponent implements OnInit {

  // Class Variables
  // Chart
  chartData: any;
  chartOptions: any;
  caseData: any;
  chartLabel: Array<string> = myGlobals.GTA;
  chartCount: Array<number> = [];

  // Set date
  today: Date = new Date(new Date().setDate(new Date().getDate()-1));
  formatToday: String = "";

  constructor(public data: DataService, private apiService: ApiService) {
    this.formatToday = formatDate(this.today );
  }

  ngOnInit() {
    this.apiService.getHealthRegion(this.formatToday).subscribe((dataOne) => {
      this.caseData = dataOne;
      for (let i = 0; i < this.chartLabel.length; i++) {
        this.countCasesHealthRegion(this.chartLabel[i]);
      }
      this.chartData = {
        labels: this.chartLabel,
        datasets: [{
          data: this.chartCount,
          backgroundColor: myGlobals.background,
          hoverBackgroundColor: myGlobals.hoverBackground,
        }]
      };
      this.chartOptions = {
        legend: {
          position: 'left',
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          }
        }
      };
    }
    )
  }

  countCasesHealthRegion(myRegion) {
    let cnt = 0;
    for (var i = 0; i <= this.caseData.cases.length - 1; i++) {
      if (this.caseData.cases[i].health_region === myRegion) {
        cnt = this.caseData.cases[i].cumulative_cases;
        this.chartCount.push(cnt);
      }
    }
  }


}
