import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';

@Component({
  selector: 'app-ontario-canada-death',
  templateUrl: './ontario-canada-death.component.html',
  styleUrls: ['./ontario-canada-death.component.scss']
})
export class OntarioCanadaDeathComponent implements OnInit {

  stackedData: any;
  stackedOptions: any;
  caseInformation: any;
  totalHospitalizations: any = 0;
  totalHospitalizationsOntario: any;
  totalFatalities: any = 0;
  totalFatalitiesOntario: any;
  totalRecoveries: any = 0;
  totalRecoveriesOntario: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getCaseData().subscribe((data) => {  //Call COVID API
      this.caseInformation = data;
      for (let i = 0; i < this.caseInformation.data.length; i++) {   //Check for ON (Ontario) Province Prefix
        this.totalFatalities += this.caseInformation.data[i].total_fatalities;
        this.totalRecoveries += this.caseInformation.data[i].total_recoveries;
        if (this.caseInformation.data[i].province == "ON") {
          this.totalFatalitiesOntario = this.caseInformation.data[i].total_fatalities;
          this.totalRecoveriesOntario = this.caseInformation.data[i].total_recoveries;


        }
      }

      this.stackedData = {
        labels: ['Fatalities', 'Recoveries'],
        datasets: [{
          type: 'bar',
          label: 'Canada',
          backgroundColor: "#4DA8DA",

          data: [this.totalFatalities, this.totalRecoveries]
        }, {
          type: 'bar',
          label: 'Ontario',
          backgroundColor: "#203647",
          data: [
            this.totalFatalitiesOntario, this.totalRecoveriesOntario
          ]
        },]
      };

      this.stackedOptions = {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      };


    })
  }

}
