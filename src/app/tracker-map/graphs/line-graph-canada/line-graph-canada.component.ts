import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import * as echarts from 'echarts'


@Component({
  selector: 'app-line-graph-canada',
  templateUrl: './line-graph-canada.component.html',
  styleUrls: ['./line-graph-canada.component.scss']
})
export class LineGraphCanadaComponent implements OnInit {
  // bar 
  basicData: any;
  basicOptions: any;

  //COVID-19 Tracker API Variables
  casesData: any;
  fatalities: any;


  initialDate = new Date();

  dataChartFatalities: any = [];
  dataChartCase: any = [];
  dateLabel: any = [];

  chartOption: any = (<any>echarts).format;


  constructor(private apiService: ApiService) {
    this.apiService.getFatalitiesCanada("10-3-2021", "25-03-2021").subscribe((dataMortality) => {
      this.fatalities = dataMortality;
      this.countFatalities();
      this.apiService.getCasesCanada("10-3-2021", "25-03-2021").subscribe((dataCases) => {
        this.casesData = dataCases;
        this.countCases();
        this.createGraph();
      })
    })
  }

  ngOnInit() {

  }

  createGraph() {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          title: "Fatalities",
          data: [this.dataChartFatalities[7],
          this.dataChartFatalities[6],
          this.dataChartFatalities[5],
          this.dataChartFatalities[4],
          this.dataChartFatalities[3],
          this.dataChartFatalities[2],
          this.dataChartFatalities[1]],
          type: 'line',
        },
        {
          title: "Cases",
          data: [this.dataChartCase[7],
          this.dataChartCase[6],
          this.dataChartCase[5],
          this.dataChartCase[4],
          this.dataChartCase[3],
          this.dataChartCase[2],
          this.dataChartCase[1]],
          type: 'line',
        },
      ],
    };
  }
  countFatalities() {
    let date = "00-00-0000";
    let cnt = 0;
    for (var i = 0; i < this.fatalities.mortality.length - 1; i++) {
      if (this.fatalities.mortality[i].date_death_report !== date) {
        if (cnt > 0) {
          this.dataChartFatalities.push(cnt)
        }
        date = this.fatalities.mortality[i].date_death_report;
        cnt += this.fatalities.mortality[i].deaths;
      } else {
        cnt += this.fatalities.mortality[i].deaths;
      }
    }


  }

  countCases() {
    let date = "00-00-0000";
    let cnt = 0;
    for (var i = 0; i < this.casesData.cases.length - 1; i++) {
      if (this.casesData.cases[i].date_report !== date) {
        if (cnt > 0) {
          this.dataChartCase.push(cnt)
        }
        date = this.casesData.cases[i].date_report;
        cnt += this.casesData.cases[i].cases;
      } else {
        cnt += this.casesData.cases[i].cases;
      }
    }
  }

}
