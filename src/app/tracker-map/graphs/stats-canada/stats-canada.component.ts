import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';

@Component({
  selector: 'app-stats-canada',
  templateUrl: './stats-canada.component.html',
  styleUrls: ['./stats-canada.component.scss']
})
export class StatsCanadaComponent implements OnInit {

  activeCases: any = 0;
  cumulativeCases: any = 0;
  newCases: any = 0;
  cumulativeDeaths: any = 0;
  deaths: any = 0;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllData().subscribe((data: any) => {  //Call COVID API
      for (let i = 0; i < 14; i++) {   //Check for ON (Ontario) Province Prefix
        this.activeCases += data.summary[i].active_cases;
        this.cumulativeCases += data.summary[i].cumulative_cases;
        this.newCases += data.summary[i].cases;
        this.cumulativeDeaths += data.summary[i].cumulative_deaths;
        this.deaths += data.summary[i].deaths;
      }
    })
 
  }

}
