// Server - CovidBit - Fast Pandas
// Created: 20, February, 2021, John Turkson
// Modified: 20 March, 2021, Teresa Costa, added routes for covid api
// MOdified: 30 March, 2021, john Turkson, added service for location

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string = 'https://backend-covidbit.herokuapp.com/news';
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
    return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCfGrP0EDXKbazT9t2wkaDP9aKB4ykK2AU`, { headers: this.corsHeaders });
  }

  // news headlines
  public getNews() {
    //return this.httpClient.get(`https://gnews.io/api/v4/search?q=covid&country=ca&token=e8f25399b0670a2b5e542b85e42ec2f1`,  {headers: this.corsHeaders})
    //return this.httpClient.get(`https://news.google.com/rss/search?q=covid&hl=en-CA&gl=CA&ceid=CA:en`,  {headers: this.corsHeaders})
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=52142b02045c42709a8a9413a15d95f1`, { headers: this.corsHeaders });
  }

}