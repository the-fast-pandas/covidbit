import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-bar-ontario-canada',
  templateUrl: './bar-ontario-canada.component.html',
  styleUrls: ['./bar-ontario-canada.component.scss']
})
export class BarOntarioCanadaComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  activeCases: any = 0;
  activeCasesOntario: any;
  totalDeaths: any = 0;
  totalDeathsOntario: any;
  totalCases: any = 0;
  totalCasesOntario: any;
  totalRecovery: any = 0;
  totalRecoveryOntario: any;

  totalData: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllData().subscribe((data) => { //Call COVID API
      this.totalData = data;
      this.countDataOntario();
      this.countData();
      this.basicData = {
        labels: [ 'Total Cases', 'Active Cases', 'Recoveries', 'Deaths'],
        datasets: [
          {
            label: 'Canada',
            backgroundColor: myGlobals.background[1],
            data: [ this.totalCases, this.activeCases, this.totalRecovery, this.totalDeaths]
          },
          {
            label: 'Ontario',
            backgroundColor:  myGlobals.background[3],
            data: [ this.totalCasesOntario, this.activeCasesOntario,  this.totalRecoveryOntario, this.totalDeathsOntario]
          }
        ]
      };
    })
  }
  countDataOntario() {
    for (var i = 0; i <= this.totalData.summary.length - 1; i++) {  
      if (this.totalData.summary[i].province === "Ontario") {
        this.activeCasesOntario = this.totalData.summary[i].active_cases;
        this.totalCasesOntario = this.totalData.summary[i].cumulative_cases;
        this.totalDeathsOntario = this.totalData.summary[i].cumulative_deaths;
        this.totalRecoveryOntario = this.totalData.summary[i].cumulative_recovered;
      }
    }
  }

  countData() {
    let cnt = 0;
    for (var i = 0; i <= this.totalData.summary.length - 1; i++) {
   
      this.activeCases += this.totalData.summary[i].active_cases;
      this.totalCases += this.totalData.summary[i].cumulative_cases;
      this.totalDeaths += this.totalData.summary[i].cumulative_deaths;
      this.totalRecovery += this.totalData.summary[i].cumulative_recovered;

    }
  }

}
