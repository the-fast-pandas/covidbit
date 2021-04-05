import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';

@Component({
  selector: 'app-ontario-canada',
  templateUrl: './ontario-canada.component.html',
  styleUrls: ['./ontario-canada.component.scss']
})
export class OntarioCanadaComponent implements OnInit {
  stackedData: any;
  stackedOptions: any;
  caseInformation: any;
  totalVaccinations: any = 0;
  totalVaccinationsOntario: any;
  totalVaccinated: any = 0;
  totalVaccinatedOntario: any;
  totalVaccinesDistributed: any = 0;
  totalVaccinesDistributedOntario: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getCaseData().subscribe((data) => {  //Call COVID API
      this.caseInformation = data;
      for (let i = 0; i < this.caseInformation.data.length; i++) {   //Check for ON (Ontario) Province Prefix
        this.totalVaccinations += this.caseInformation.data[i].total_vaccinations;
        this.totalVaccinated += this.caseInformation.data[i].total_vaccinated;
        this.totalVaccinesDistributed += this.caseInformation.data[i].total_vaccines_distributed;
        if (this.caseInformation.data[i].province == "ON") {
          this.totalVaccinationsOntario = this.caseInformation.data[i].total_vaccinations;
          this.totalVaccinatedOntario = this.caseInformation.data[i].total_vaccinated;
          this.totalVaccinesDistributedOntario = this.caseInformation.data[i].total_vaccines_distributed;



        }
      }

      this.stackedData = {
        labels: ['Total Vaccinations', 'Total People Vaccinated', 'Vaccines Distributed'],
        datasets: [{
          type: 'bar',
          label: 'Canada',
          backgroundColor: "#4DA8DA",

          data: [this.totalVaccinations, this.totalVaccinated, this.totalVaccinesDistributed]
        }, {
          type: 'bar',
          label: 'Ontario',
          backgroundColor: "#203647",
          data: [
            this.totalVaccinationsOntario, this.totalVaccinatedOntario, this.totalVaccinesDistributedOntario
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
