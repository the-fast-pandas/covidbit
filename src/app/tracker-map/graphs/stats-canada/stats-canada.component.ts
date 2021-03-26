import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';

@Component({
  selector: 'app-stats-canada',
  templateUrl: './stats-canada.component.html',
  styleUrls: ['./stats-canada.component.scss']
})
export class StatsCanadaComponent implements OnInit {
  caseInformation: any;
  currentDate: any = 0;
  totalCases: any = 0;
  totalCriticals: any = 0;
  totalFatalities: any = 0;
  totalHospitalizations: any = 0;
  totalRecoveries: any = 0;
  totalTests: any = 0;
  totalVaccinations: any = 0;
  totalVaccinated: any = 0;
  totalVaccinesDistributed: any = 0;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCaseData().subscribe((data) => {  //Call COVID API
      this.caseInformation = data;
      for (let i = 0; i < this.caseInformation.data.length; i++) {   //Check for ON (Ontario) Province Prefix
        this.currentDate = this.caseInformation.data[i].date;
        this.totalCases += this.caseInformation.data[i].total_cases;
        this.totalCriticals += this.caseInformation.data[i].total_criticals;
        this.totalFatalities += this.caseInformation.data[i].total_fatalities;
        this.totalHospitalizations += this.caseInformation.data[i].total_hospitalizations;
        this.totalRecoveries += this.caseInformation.data[i].total_recoveries;
        this.totalTests += this.caseInformation.data[i].total_tests;
        this.totalVaccinations += this.caseInformation.data[i].total_vaccinations;
        this.totalVaccinated += this.caseInformation.data[i].total_vaccinated;
        this.totalVaccinesDistributed += this.caseInformation.data[i].total_vaccines_distributed;
      }
    })
  }

}
