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
  lastMonths: number = 3;

  idList: Array<string> = [];
  monthListBusiness: Array<number> = [];
  monthListCases: Array<number> = [];
  chartLabelTemp: Array<string> = [];

  chartLabel: Array<string> = [];
  chartCountBusiness: Array<number> = [];
  chartCountCases: Array<number> = [];

  initialDate = this.addMonths(new Date(), -this.lastMonths);
  dateNumbers: Array<number> = []

  constructor(public data: DataService) {
    this.data.getAllBusiness().subscribe(
      users => {
        this.getDate(users.myUsers, this.monthListBusiness);
        this.count(this.monthListBusiness, this.chartCountBusiness);
        this.data.getAllCases().subscribe(
          cases => {
            this.getDate(cases.myCases, this.monthListCases);
            this.count(this.monthListCases, this.chartCountCases);
            this.getLabels();
            this.getGraph();
          }
        )
      }
    )
  }
  ngOnInit(): void { }


  getDate(typeData: any, myList: Array<number>) {
    for (let i = 0; i < Object.keys(typeData).length; i++) {
      let date = new Date(parseInt(typeData[i].id.substring(0, 8), 16) * 1000);
      if (date > this.initialDate) {
        myList.push(date.getMonth());
      }
    }
  }

  getLabels() {
    let temp = this.initialDate.getMonth() +1;
    if (temp > 11) {
      temp = temp - 11;
      this.dateNumbers.push(temp);
      this.dateNumbers.push(temp + 1);
      this.dateNumbers.push(temp + 2);
    } else {
      this.dateNumbers.push(temp);
      temp++;
      if (temp > 11) {
        temp = temp - 11;
        this.dateNumbers.push(temp);
        this.dateNumbers.push(temp + 1);
      } else {
        this.dateNumbers.push(temp);
        temp++;
        if (temp > 11) {
          temp = temp - 11;
          this.dateNumbers.push(temp);
        } else {
          this.dateNumbers.push(temp);
        }
      }
    }
    console.log(this.dateNumbers)
      this.chartLabelTemp.push(myGlobals.months[this.dateNumbers[0]-1]);
      this.chartLabelTemp.push(myGlobals.months[this.dateNumbers[1]-1]);
      this.chartLabelTemp.push(myGlobals.months[this.dateNumbers[2]-1]);
  }

  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  count(myList: Array<number>, myChart: Array<number>) {
    let current = 0;
    let cnt = 0;
    for (var i = 0; i <= myList.length; i++) {
      if (myList[i] != current) {
     
        myChart.push(cnt);
        current = myList[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
  }

  getGraph() {
    this.basicData = {
      labels: this.chartLabelTemp,
      datasets: [
        {
          label: 'Business Registered',
          backgroundColor: myGlobals.background[2],
          data: this.chartCountBusiness
        },
        {
          label: 'Cases Registered',
          backgroundColor: myGlobals.background[3],
          data: this.chartCountCases
        }
      ]
    }

  }


}

