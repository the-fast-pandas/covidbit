import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-covid-services/api.service'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
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
  }

}
