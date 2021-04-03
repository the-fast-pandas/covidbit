import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-services/data.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-chart-business',
  templateUrl: './chart-business.component.html',
  styleUrls: ['./chart-business.component.scss']
})
export class ChartBusinessComponent implements OnInit {

  chartData: any;
  chartOptions: any;
  typesList: Array<string> = [];
  chartLabel: Array<string> = [];
  chartCount: Array<number> = [];

  constructor(public data: DataService) {
    this.data.getAllBusiness().subscribe(
      data => {
        this.getTypes(data);
        this.count();
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

  getTypes(data: any) {
    for (let i = 0; i < Object.keys(data.myUsers).length; i++) {
      this.typesList.push(data.myUsers[i].businessType);
    }
  }

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
