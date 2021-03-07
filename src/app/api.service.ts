import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getCaseData() {
    return this.httpClient.get(`https://api.covid19tracker.ca/summary`);
  }

}
