// Server - CovidBit - Fast Pandas
// Created: 17, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import * as echarts from 'echarts'
import * as myGlobals from '../../../globals';
declare const formatDate: any;

@Component({
  selector: 'app-line-graph-canada',
  templateUrl: './line-graph-canada.component.html',
  styleUrls: ['./line-graph-canada.component.scss']
})
export class LineGraphCanadaComponent implements OnInit {
  //Class Variables
  //API data
  casesData: any;
  fatalities: any;
  //Chart
  chart: any = (<any>echarts).format;
  dataChartFatalities: any = [];
  dataChartCase: any = [];
  //Dates
  today: Date = new Date(new Date().setDate(new Date().getDate() - 1));
  todayDate = (this.today.getMonth()+1)+'/'+this.today.getDate(); 
  sevenDays: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  sevenDaysDate = (this. sevenDays.getMonth()+1)+'/'+this. sevenDays.getDate(); 
  formatToday: String = "";
  formatSevenDays: String = "";

  constructor(private apiService: ApiService) {
    this.formatToday = formatDate(this.today);
    this.formatSevenDays = formatDate(this.sevenDays);
  }

  ngOnInit() {
    this.apiService.getFatalitiesCanada(this.formatSevenDays, this.formatToday).subscribe((dataMortality) => {
      this.fatalities = dataMortality;
      this.countFatalities();
      this.apiService.getCasesCanada(this.formatSevenDays, this.formatToday).subscribe((dataCases) => {
        this.casesData = dataCases;
        this.countCases();
        this.createGraph();
      })
    })
  }


  createGraph() {
    this.chart = {
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        data: ['Fatalities', 'Cases']
    },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [this.sevenDaysDate, '', '', '', '', '', this.todayDate]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Fatalities',
          data: [Math.log(this.dataChartFatalities[1]),
          Math.log(this.dataChartFatalities[2]),
          Math.log(this.dataChartFatalities[3]),
          Math.log(this.dataChartFatalities[4]),
          Math.log(this.dataChartFatalities[5]),
          Math.log(this.dataChartFatalities[6]),
          Math.log(this.dataChartFatalities[7])],
          type: 'line',
          color: myGlobals.lineGraph[0],
        },
        {
          name: 'Cases',
          data: [Math.log(this.dataChartCase[1]),
          Math.log(this.dataChartCase[2]),
          Math.log(this.dataChartCase[3]),
          Math.log(this.dataChartCase[4]),
          Math.log(this.dataChartCase[5]),
          Math.log(this.dataChartCase[6]),
          Math.log(this.dataChartCase[7])],
          type: 'line',
          color: myGlobals.lineGraph[1],
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
        cnt += this.fatalities.mortality[i].cumulative_deaths;
      } else {
        cnt += this.fatalities.mortality[i].cumulative_deaths;
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
        cnt += this.casesData.cases[i].cumulative_cases;
      } else {
        cnt += this.casesData.cases[i].cumulative_cases;
      }
    }
  }

}
