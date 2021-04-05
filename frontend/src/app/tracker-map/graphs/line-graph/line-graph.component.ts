// Server - CovidBit - Fast Pandas
// Created: 17, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-covid-services/api.service'
import * as echarts from 'echarts'
declare const formatDate: any;

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  //Class Variables
  //API data
  casesData: any;
  fatalities: any;
  //Chart
  chart: any = (<any>echarts).format;
  dataChartFatalities: Array<String> = [];
  dataChartCase: Array<String> = [];
  //Dates
  today: Date = new Date(new Date().setDate(new Date().getDate() - 1));
  sevenDays: Date = new Date(new Date().setDate(new Date().getDate() - 7));
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
    for (var i = 0; i <= this.fatalities.mortality.length - 1; i++) {
      if (this.fatalities.mortality[i].province === "Ontario") {
        this.dataChartFatalities.push(this.fatalities.mortality[i].cumulative_deaths)
      }
    }
  }

  countCases() {
    for (var i = 0; i <= this.casesData.cases.length - 1; i++) {
      if (this.casesData.cases[i].province === "Ontario") {
        this.dataChartCase.push(this.casesData.cases[i].cumulative_cases)
      }
    }
  }

}



