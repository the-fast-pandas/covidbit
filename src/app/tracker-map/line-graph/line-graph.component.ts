import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-covid-services/api.service'
import * as echarts from 'echarts'


@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  // bar 
  basicData: any;
  basicOptions: any;
  labelList = ['Tests', 'Cases', 'Hospitalizations', 'Recoveries', 'Deaths', 'Vaccinations', 'People Vacinated']

  //COVID-19 Tracker API Variables
  case: any;


  initialDate = new Date();

  dataChart: any = [];
  dataChartCase: any = [];

  chartOption: any = (<any>echarts).format;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    

    this.apiService.getFatalities().subscribe((data) => {
      this.case = data;
      let one = this.count("2021-02-03", this.case)
      let two = this.count("2021-02-02", this.case)
      let three = this.count("2021-02-01", this.case)
      let four = this.count("2021-01-31", this.case)
      let five = this.count("2021-01-30", this.case)
      let six = this.count("2021-01-29", this.case)
      let seven = this.count("2021-01-28", this.case)
      this.dataChart.push(one);
      this.dataChart.push(two);
      this.dataChart.push(three);
      this.dataChart.push(four);
      this.dataChart.push(five);
      this.dataChart.push(six);
      this.dataChart.push(seven);
      this.apiService.getCases(1).subscribe(
        (dataOne) => {
        this.case = dataOne;
        console.log(this.case);
        let oneCase = this.count("2021-02-03", this.case)
        let twoCase = this.count("2021-02-02", this.case)
        let threeCase = this.count("2021-02-01", this.case)
        let fourCase = this.count("2021-01-31", this.case)
        let fiveCase = this.count("2021-01-30", this.case)
        let sixCase = this.count("2021-01-29", this.case)
        let sevenCase = this.count("2021-01-28", this.case)
        this.dataChartCase.push(oneCase);
        this.dataChartCase.push(twoCase);
        this.dataChartCase.push(threeCase);
        this.dataChartCase.push(fourCase);
        this.dataChartCase.push(fiveCase);
        this.dataChartCase.push(sixCase);
        this.dataChartCase.push(sevenCase);
  

      this.chartOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            title: "Fatalities",
            data: this.dataChart,
            type: 'line',
          },
          {
            title: "Cases",
            data: this.dataChartCase,
            type: 'line',
          },
        ],
      };
    })

    }) //Call COVID API

  }

  count(date: any, myList: any) {
    let cnt = 0;
    for (var i = 0; i <= myList.data.length - 1; i++) {
      let sub = myList.data[i].date.substring(0, 10);
      console.log(sub)
      if (sub == date) {
        cnt++
      }

    }
    return cnt;
  }

}
