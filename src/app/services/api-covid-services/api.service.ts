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
  
  public getFatalitiesCanada(dateAfter: any, dateBefore: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=mortality&loc=prov&after=` + dateAfter + `&before=` + dateBefore ,{headers: this.corsHeaders});
  }

  public getCasesCanada(dateAfter: any, dateBefore: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=prov&after=` + dateAfter + `&before=` + dateBefore ,{headers: this.corsHeaders});
  }

  public getHealthRegion(date: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=hr&date=` + date ,{headers: this.corsHeaders});
  }

  public getHealthRegionFatalities(date: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=mortality&loc=hr&date=` + date ,{headers: this.corsHeaders});
  }

  public getAllData() {
    return this.httpClient.get(`https://api.opencovid.ca/summary`,{headers: this.corsHeaders});
  }
}
