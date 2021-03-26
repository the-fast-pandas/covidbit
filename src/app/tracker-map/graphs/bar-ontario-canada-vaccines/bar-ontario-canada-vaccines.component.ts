import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-covid-services/api.service';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-bar-ontario-canada-vaccines',
  templateUrl: './bar-ontario-canada-vaccines.component.html',
  styleUrls: ['./bar-ontario-canada-vaccines.component.scss']
})
export class BarOntarioCanadaVaccinesComponent implements OnInit {

  basicData: any;
  basicOptions: any;

  distributedVaccines: any = 0;
  distributedVaccinesOntario: any;
  appliedVaccines: any = 0;
  appliedVaccinesOntario: any;


  totalData: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllData().subscribe((data) => { //Call COVID API
      this.totalData = data;
      this.countDataOntario();
      this.countData();
      this.basicData = {
        labels: ['Distributed Vaccines', 'Applied Vaccines'],
        datasets: [
          {
            label: 'Ontario',
            backgroundColor: myGlobals.background[4],
            data: [this.distributedVaccinesOntario, this.appliedVaccinesOntario]
          },
          {
            label: 'Canada',
            backgroundColor: myGlobals.background[5],
            data: [this.distributedVaccines, this.appliedVaccines]
          }
        ]
      };
    })
  }
  countDataOntario() {
    for (var i = 0; i <= this.totalData.summary.length - 1; i++) {
      if (this.totalData.summary[i].province === "Ontario") {
        if (this.totalData.summary[i].cumulative_dvaccine !== "NULL") {
          this.distributedVaccinesOntario = this.totalData.summary[i].cumulative_dvaccine;
        }
        if (this.totalData.summary[i].cumulative_avaccine !== "NULL") {
          this.appliedVaccinesOntario = this.totalData.summary[i].cumulative_avaccine;
        }

      }
    }
  }

  countData() {
    let cnt = 0;
    for (var i = 0; i <= this.totalData.summary.length - 1; i++) {
      if (this.totalData.summary[i].cumulative_avaccine !== "NULL") {
        this.appliedVaccines += this.totalData.summary[i].cumulative_avaccine;
      }
      if (this.totalData.summary[i].cumulative_dvaccine !== "NULL") {
        this.distributedVaccines += this.totalData.summary[i].cumulative_dvaccine;
      }
    }
  }

}
