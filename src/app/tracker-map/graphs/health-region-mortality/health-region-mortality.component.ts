import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import { DataService } from 'src/app/services/data-services/data.service';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-health-region-mortality',
  templateUrl: './health-region-mortality.component.html',
  styleUrls: ['./health-region-mortality.component.scss']
})
export class HealthRegionMortalityComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  typesList: Array<string> = [];
  chartLabel: Array<string> = ["Hamilton", "Peel", "Toronto", "York"];
  chartCount: Array<number> = [];
  caseData: any;

  constructor(public data: DataService, private apiService: ApiService) {
    this.apiService.getHealthRegionFatalities("24-03-2021").subscribe((dataOne) => {
      this.caseData = dataOne;
      for (let i = 0; i < this.chartLabel.length; i++) {
        this.countFatalitiesHealthRegion(this.chartLabel[i]);
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

  ngOnInit() { }

  countFatalitiesHealthRegion(myRegion) {
    let cnt = 0;
    for (var i = 0; i <= this.caseData.mortality.length - 1; i++) {
      if (this.caseData.mortality[i].health_region === myRegion) {
        cnt = this.caseData.mortality[i].cumulative_deaths;
        this.chartCount.push(cnt);
      }
    }


  }

}
