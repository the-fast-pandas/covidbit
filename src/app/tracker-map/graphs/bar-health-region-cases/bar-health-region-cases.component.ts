import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import { DataService } from 'src/app/services/data-services/data.service';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-bar-health-region-cases',
  templateUrl: './bar-health-region-cases.component.html',
  styleUrls: ['./bar-health-region-cases.component.scss']
})
export class BarHealthRegionCasesComponent implements OnInit {

  stackedData: any;
  stackedOptions: any;

  chartTotalCount: any = 0;
  chartRegion: any[] = [];

  totalData: any;
  totalToronto: any;
  totalPeel: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getHealthRegion("24-03-2021").subscribe((data) => { //Call COVID API
      this.totalData = data;
      this.countTotalCases();
      this.countRegion("Toronto");
      this.countRegion("Peel");
      this.countRegion("York");
      this.stackedData = {
        labels: ['Toronto', 'Peel', 'York'],
        datasets: [{
          type: 'bar',
          label: 'Ontario',
          backgroundColor: "#4DA8DA",

          data: [this.chartTotalCount, this.chartTotalCount, this.chartTotalCount]
        }, {
          type: 'bar',
          label: 'Specific Region',
          backgroundColor: "#203647",
          data: [
            this.chartRegion[0],  this.chartRegion[1],  this.chartRegion[2]
          ]
        },]
      };

      this.stackedOptions = {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      };


    })
  }

  countTotalCases() {
    let cnt = 0;
    for (var i = 0; i <= this.totalData.cases.length - 1; i++) {
      cnt += this.totalData.cases[i].cumulative_cases;
    }
    this.chartTotalCount = cnt;
  }

  countRegion(myRegion) {
    let cnt = 0;
    for (var i = 0; i <= this.totalData.cases.length - 1; i++) {
      if (this.totalData.cases[i].health_region === myRegion) {
        cnt = this.totalData.cases[i].cumulative_cases;
        this.chartRegion.push(cnt);
      }
    }
  }
}

