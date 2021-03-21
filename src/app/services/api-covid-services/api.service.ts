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

}
