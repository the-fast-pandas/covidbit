import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-covid-services/api.service'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  activeCases: any = 0;
  cumulativeCases: any = 0;
  newCases: any = 0;
  cumulativeDeaths: any = 0;
  deaths: any = 0;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllData().subscribe((data: any) => {  //Call COVID API
      for (let i = 0; i < 14; i++) {   //Check for ON (Ontario) Province Prefix
        if (data.summary[i].province == "Ontario") {
          this.activeCases += data.summary[i].active_cases;
          this.cumulativeCases += data.summary[i].cumulative_cases;
          this.newCases += data.summary[i].cases;
          this.cumulativeDeaths += data.summary[i].cumulative_deaths;
          this.deaths += data.summary[i].deaths;
        }
      }
    })
  }

}
