import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-services/data.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-bar-business-cases',
  templateUrl: './bar-business-cases.component.html',
  styleUrls: ['./bar-business-cases.component.scss']
})
export class BarBusinessCasesComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  lastMonths: number = 6;

  idList: Array<string> = [];
  monthList: Array<number> = [];

  chartLabel: Array<string> = [];
  chartCount: Array<number> = [];

  initialDate = this.addMonths(new Date(), -this.lastMonths);

  constructor(public dataService: DataService) {
    this.dataService.getAllBusiness().subscribe(
      data => {
        this.getDate(data);
        this.count();
        this.basicData = {
          labels: this.chartLabel,
          datasets: [
            {
              label: 'Business Registered',
              backgroundColor: '#42A5F5',
              data: this.chartCount
            }
          ]
        };
      }
    )
  }
  ngOnInit(): void {
  }


  getDate(data: any) {
    for (let i = 0; i < Object.keys(data.myUsers).length; i++) {
      let date = new Date(parseInt(data.myUsers[i].id.substring(0, 8), 16) * 1000);
      if (date > this.initialDate) {
        this.monthList.push(date.getMonth());
      }
    }
    console.log(this.monthList)
  }

  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  count() {
    let current = 0;
    let cnt = 0;
    for (var i = 0; i <= this.monthList.length; i++) {
      if (this.monthList[i] != current) {

        if (cnt > 0) {
          this.chartLabel.push(myGlobals.months[current]);
          this.chartCount.push(cnt);
        }
        current = this.monthList[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }

  }

}

