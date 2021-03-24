import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/'
  });

  constructor(private httpClient: HttpClient) { }

  public getCaseData() {
    return this.httpClient.get(`https://api.covid19tracker.ca/summary/split`,{headers: this.corsHeaders});
  }

  public getFatalities() {
    return this.httpClient.get(`https://api.covid19tracker.ca/fatalities?province=ON&per_page=1000`,{headers: this.corsHeaders});
  }

  public getCases(page: any) {
    return this.httpClient.get(`https://api.covid19tracker.ca/cases?province=ON&per_page=1000&page=` + page,{headers: this.corsHeaders});
  }
  

}
