import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-covid-services/api.service'

@Component({
  selector: 'app-bar-horizontal',
  templateUrl: './bar-horizontal.component.html',
  styleUrls: ['./bar-horizontal.component.scss']
})
export class BarHorizontalComponent implements OnInit {
  // bar 
  basicData: any;
  basicOptions: any;
  labelList = ['Tests', 'Cases', 'Hospitalizations', 'Recoveries', 'Deaths', 'Vaccinations', 'People Vacinated']

  //COVID-19 Tracker API Variables
  caseInformation: any;
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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
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

          // Bar graph
          this.basicData = {
            labels: this.labelList,
            datasets: [
              {
                label: this.currentDate,
                backgroundColor: '#42A5F5',
                data: [this.totalTests, 
                  this.totalCases, 
                  this.totalHospitalizations, 
                  this.totalRecoveries, 
                  this.totalFatalities, 
                  this.totalVaccinations, 
                  this.totalVaccinated
                ]
              }
            ]
          }
        }
      }
    }
    )
  }
}
