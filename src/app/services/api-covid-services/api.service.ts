// Server - CovidBit - Fast Pandas
// Created: 20, February, 2021, John Turkson
// Modified: 20 March, 2021, Teresa Costa, added routes for covid api
// MOdified: 30 March, 2021, john Turkson, added service for location

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string = 'https://backend-covidbit.herokuapp.com/api';
  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'x-requested-with'
  });

  constructor(private httpClient: HttpClient) { }

  public getFatalitiesCanada(dateAfter: any, dateBefore: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=mortality&loc=prov&after=` + dateAfter + `&before=` + dateBefore, { headers: this.corsHeaders });
  }

  public getCasesCanada(dateAfter: any, dateBefore: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=prov&after=` + dateAfter + `&before=` + dateBefore, { headers: this.corsHeaders });
  }

  public getHealthRegion(date: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=hr&date=` + date, { headers: this.corsHeaders });
  }

  public getHealthRegionFatalities(date: any) {
    return this.httpClient.get(`https://api.opencovid.ca/timeseries?stat=mortality&loc=hr&date=` + date, { headers: this.corsHeaders });
  }

  public getAllData() {
    return this.httpClient.get(`https://api.opencovid.ca/summary`, { headers: this.corsHeaders });
  }

  // coordinates/locations
  public getLocationCoords(address: any) {
    console.log(address)
    const api = `${this.endpoint}/google-api-maps`;
    return this.httpClient.get<any>(api, address)
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("Sorry, no service from maps.");
          }
        ))
  }

  // news headlines
  public getNews() {
    const api = `${this.endpoint}/news-covid`;
    return this.httpClient.get<any>(api)
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("Sorry, no news today.");
          }
        ))
    // return this.httpClient.get(`http://api.mediastack.com/v1/news?access_key=08a50875122473c0c35d0c131ecd6b11&countries=ca&keywords=covid`, { headers: this.corsHeaders });
  }

}