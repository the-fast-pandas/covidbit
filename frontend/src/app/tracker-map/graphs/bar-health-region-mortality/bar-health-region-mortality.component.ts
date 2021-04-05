import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import { DataService } from 'src/app/services/data-services/data.service';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-bar-health-region-mortality',
  templateUrl: './bar-health-region-mortality.component.html',
  styleUrls: ['./bar-health-region-mortality.component.scss']
})
export class BarHealthRegionMortalityComponent implements OnInit {
  stackedData: any;
  stackedOptions: any;

  chartTotalCount: any = 0;
  chartRegion: any[] = [];

  totalData: any;
  totalToronto: any;
  totalPeel: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getHealthRegionFatalities("24-03-2021").subscribe((data) => { //Call COVID API
      this.totalData = data;
      this.countTotalFatalities();
      this.countRegionFatalities("Toronto");
      this.countRegionFatalities("Peel");
      this.countRegionFatalities("York");
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

  countTotalFatalities() {
    let cnt = 0;
    for (var i = 0; i <= this.totalData.mortality.length - 1; i++) {
      cnt += this.totalData.mortality[i].cumulative_deaths;
    }
    this.chartTotalCount = cnt;
  }

  countRegionFatalities(myRegion) {
    let cnt = 0;
    for (var i = 0; i <= this.totalData.mortality.length - 1; i++) {
      if (this.totalData.mortality[i].health_region === myRegion) {
        cnt = this.totalData.mortality[i].cumulative_deaths;
        this.chartRegion.push(cnt);
      }
    }
  }

}
