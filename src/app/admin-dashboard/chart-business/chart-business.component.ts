// Server - CovidBit - Fast Pandas
// Created:  01, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
// local Service
import { DataService } from '../../services/data-services/data.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-chart-business',
  templateUrl: './chart-business.component.html',
  styleUrls: ['./chart-business.component.scss']
})
export class ChartBusinessComponent implements OnInit {

  typesList: Array<string> = [];

  // Chart Instances
  chartData: any;
  chartOptions: any;
  chartLabel: Array<string> = [];
  chartCount: Array<number> = [];
  typesLabelPostion: String = 'left';

  constructor(public data: DataService) {
    this.data.getAllBusiness().subscribe(
      data => {
        this.getTypes(data);
        this.count();
        this.chartData = {
          labels: this.chartLabel,
          datasets: [{
            data: this.chartCount,
            backgroundColor: myGlobals.hoverBackground,
            hoverBackgroundColor: myGlobals.background,
          }]
        };
        this.chartOptions = {
          legend: {
            position: this.typesLabelPostion,
            labels: {
              fontColor: 'rgb(255, 99, 132)'
            }
          }
        };
      }
    )
  }

  ngOnInit() { }

  // Called by Constructor
  // Lsit the types of Business
  getTypes(data: any) {
    for (let i = 0; i < Object.keys(data.users).length; i++) {
      this.typesList.push(data.users[i].businessType);
    }
  }

  // Called by Constructor
  // Counts the quantity of each type
  count() {
    this.typesList.sort();
    let current = "";
    let cnt = 0;
    for (var i = 0; i <= this.typesList.length; i++) {
      if (this.typesList[i] != current) {
        if (cnt > 0) {
          this.chartLabel.push(current);
          this.chartCount.push(cnt);
        }
        current = this.typesList[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
  }

}
