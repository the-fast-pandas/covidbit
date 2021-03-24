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

  //COVID-19 Tracker API Variables
  case: any;
  fatalities: any;
  caseTemp: any;
  caseTempTwo: any;


  initialDate = new Date();

  dataChartFatalities: any = [];
  dataChartCase: any = [];
  dateLabel: any = [];

  chartOption: any = (<any>echarts).format;


  constructor(private apiService: ApiService) {  
    this.callData();}

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
    let current = "0000-00-00";
    let cnt = 0;
    for (var i = 0; i <= this.fatalities.data.length - 1; i++) {
      let sub = this.fatalities.data[i].date.substring(0, 10);
      if (sub != current) {
        if (cnt > 0) {
          this.dataChartFatalities.push(cnt);
          this.dateLabel.push(current);
        }
        current = this.fatalities.data[i].date.substring(0, 10);
        cnt = 1;
      } else {
        cnt++;
      }
    }

  }

  countCases() {
    let current = "0000-00-00";
    let cnt = 0;
    for (var i = 0; i <= this.case.length - 1; i++) {
      let sub = this.case[i].date.substring(0, 10);
      if (sub != current) {
        if (cnt > 0) {
          this.dataChartCase.push(cnt);
        }
        current = this.case[i].date.substring(0, 10);
        cnt = 1;
      } else {
        cnt++;
      }
    }

  }

  callData() {
    this.apiService.getFatalities().subscribe((data) => {
      this.fatalities = data;
      this.countFatalities();
      this.apiService.getCases(1).subscribe((dataOne) => {
        this.caseTemp = dataOne;
        this.apiService.getCases(2).subscribe((dataTwo) => {
          this.caseTempTwo = dataTwo;
          this.case = [...this.caseTemp.data, ...this.caseTempTwo.data];
          this.apiService.getCases(3).subscribe((dataThree) => {
            this.caseTemp = dataThree;
            this.caseTempTwo = [...this.case, ...this.caseTemp.data];
            this.apiService.getCases(4).subscribe((dataFour) => {
              this.caseTemp = dataFour;
              this.case = [...this.caseTempTwo, ...this.caseTemp.data];
              this.apiService.getCases(5).subscribe((dataFive) => {
                this.caseTemp = dataFive;
                this.caseTempTwo = [...this.case, ...this.caseTemp.data];
                this.apiService.getCases(6).subscribe((dataSix) => {
                  this.caseTemp = dataSix;
                  this.case = [...this.caseTempTwo, ...this.caseTemp.data];
                  this.apiService.getCases(7).subscribe((dataSeven) => {
                    this.caseTemp = dataSeven;
                    this.caseTempTwo = [...this.case, ...this.caseTemp.data];
                    this.apiService.getCases(8).subscribe((dataE) => {
                      this.caseTemp = dataE;
                      this.case = [...this.caseTempTwo, ...this.caseTemp.data];
                      this.apiService.getCases(9).subscribe((dataNine) => {
                        this.caseTemp = dataNine;
                        this.caseTempTwo = [...this.case, ...this.caseTemp.data];
                        this.apiService.getCases(10).subscribe((dataTen) => {
                          this.caseTemp = dataTen;
                          this.case = [...this.caseTempTwo, ...this.caseTemp.data];
                          this.apiService.getCases(11).subscribe((dataEleven) => {
                            this.caseTemp = dataEleven;
                            this.caseTempTwo = [...this.case, ...this.caseTemp.data];
                            this.apiService.getCases(12).subscribe((dataTwelve) => {
                              this.caseTemp = dataTwelve;
                              this.case = [...this.caseTempTwo, ...this.caseTemp.data];
                              this.apiService.getCases(13).subscribe((dataThirteen) => {
                                this.caseTemp = dataThirteen;
                                this.caseTempTwo = [...this.case, ...this.caseTemp.data];
                                this.apiService.getCases(14).subscribe((dataFourteen) => {
                                  this.caseTemp = dataFourteen;
                                  this.case = [...this.caseTempTwo, ...this.caseTemp.data];

                                  this.countCases();

                                  this.createGraph();

                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })

  }

}
