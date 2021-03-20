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
  monthListBusiness: Array<number> = [];
  monthListCases: Array<number> = [];
  chartLabelTemp: Array<string> = [];

  chartLabel: Array<string> = [];
  chartCountBusiness: Array<number> = [];
  chartCountCases: Array<number> = [];

  initialDate = this.addMonths(new Date(), -this.lastMonths);

  constructor(public data: DataService) {
    this.data.getAllBusiness().subscribe(
      users => {
        this.getDate(users.myUsers, this.monthListBusiness);
        this.count(this.monthListBusiness, this.chartCountBusiness);
        this.data.getAllCases().subscribe(
          cases => {
            this.getDate(cases.myCases, this.monthListCases);
            this.count(this.monthListCases, this.chartCountCases);
           }
        )
      }
    )
  }
  ngOnInit(): void {
    this.basicData = {
      labels: this.chartLabelTemp,
      datasets: [
        {
          label: 'Business Registered',
          backgroundColor: '#42A5F5',
          data: this.chartCountBusiness
        },
        {
          label: 'Cases Registered',
          backgroundColor: '#000600',
          data: this.chartCountCases
        }
      ]
    }
  }


  getDate(typeData: any, myList: Array<number>) {
    for (let i = 0; i < Object.keys(typeData).length; i++) {
      let date = new Date(parseInt(typeData[i].id.substring(0, 8), 16) * 1000);
      if (date > this.initialDate) {
        myList.push(date.getMonth());
      }
    }
    
  }

  onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

   

  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  count(myList: Array<number>, myChart:Array<number> ) {
    let current = 0;
    let cnt = 0;
    for (var i = 0; i <= myList.length; i++) {
      if (myList[i] != current) {

        if (cnt > 0) {
          this.chartLabelTemp.push(myGlobals.months[current]);
          myChart.push(cnt);
        }
        current = myList[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
   
  }

  

}

