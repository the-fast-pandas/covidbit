// Server - CovidBit - Fast Pandas
// Created: 20, February, 2021, John Turkson
// Modified: 20 March, 2021, Teresa Costa, added routes for covid api

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
   // 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE',
    //'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
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

  public getLocationCoords(address: any) {
    return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCfGrP0EDXKbazT9t2wkaDP9aKB4ykK2AU`, {headers: this.corsHeaders});
  }

}
