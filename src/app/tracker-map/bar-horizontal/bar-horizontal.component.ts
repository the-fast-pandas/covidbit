import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-bar-horizontal',
  templateUrl: './bar-horizontal.component.html',
  styleUrls: ['./bar-horizontal.component.scss']
})
export class BarHorizontalComponent implements OnInit {
  // bar 
  basicData: any;
  basicOptions: any;
  labelList = ['Tests','Cases', 'Hospitalizations', 'Recoveries', 'Deaths', 'Vaccinations', 'People Vacinated']
    

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
  constructor(private apiService: ApiService) { 
    console.log(this.labelList)
    this.apiService.getCaseData().subscribe((data) => {
      this.caseInformation = data;
      console.log(data)
    }
    
    )

  }

  ngOnInit() {
 //Call COVID API
 this.apiService.getCaseData().subscribe((data) => {
  this.caseInformation = data;

  //Check for ON (Ontario) Province Prefix
  for (let i = 0; i < this.caseInformation.data.length; i++) {
    if (this.caseInformation.data[i].province == "ON") {

      //Store API Data in Varibales (All Total Data)
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

     
  this.basicData = {
      labels: this.labelList,
      datasets: [
          {
              label: this.currentDate,
              backgroundColor: '#42A5F5',
              data: [this.totalTests, this.totalCases, this.totalHospitalizations, this.totalRecoveries, this.totalFatalities, this.totalVaccinations, this.totalVaccinated]
          }
      ]
  }
  }
}}
 )}
}
