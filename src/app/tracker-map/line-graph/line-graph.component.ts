import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
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
  caseInformation: any;
  case: any;
  currentDate: any;
  totalCases: any
  totalCriticals: any
  totalFatalities: any
  totalHospitalizations: any;
  totalRecoveries: any;
  totalTests: any
  totalVaccinations: any
  totalVaccinated: any
  totalVaccinesDistributed: any

  initialDate = new Date();

  dataChart: any = [];

  chartOption: any = (<any>echarts).format;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCaseData().subscribe((data) => {  //Call COVID API
      this.caseInformation = data;
      for (let i = 0; i < this.caseInformation.data.length; i++) {   //Check for ON (Ontario) Province Prefix
        if (this.caseInformation.data[i].province == "ON") {
          this.currentDate = this.caseInformation.data[i].date;
          this.totalCases = this.caseInformation.data[i].total_cases;
          this.totalCriticals = this.caseInformation.data[i].total_criticals;
          this.totalFatalities = this.caseInformation.data[i].total_fatalities;
          this.totalHospitalizations = this.caseInformation.data[i].total_hospitalizations;
          this.totalRecoveries = this.caseInformation.data[i].total_recoveries;
          this.totalTests = this.caseInformation.data[i].total_tests;
          this.totalVaccinations = this.caseInformation.data[i].total_vaccinations;
          this.totalVaccinated = this.caseInformation.data[i].total_vaccinated;
          this.totalVaccinesDistributed = this.caseInformation.data[i].total_vaccines_distributed;
        }
      }
    })

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

      console.log(this.dataChart)
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
        ],
      };


    }) //Call COVID API

  }

  count(date: any, myList: any) {
    let cnt = 0;
    for (var i = 0; i <= myList.data.length - 1; i++) {
      let sub = myList.data[i].date.substring(0, 10);
      if (sub == date) {
        cnt++
      }

    }
    return cnt;
  }

}
