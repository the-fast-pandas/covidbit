// Server - CovidBit - Fast Pandas
// Created: 04, March, 2021, Teresa Costa

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessName } from '../models/businessName.model';


@Injectable({
  providedIn: 'root'
})
export class AdmService {

  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  // For the administrator to search a user on database
  // Returns user data or an error message
  searchUserAdm(business: BusinessName) {
    const api = `${this.endpoint}/search-user-adm`;
    return this.http.post<any>(api, business)
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No business with this name.");
          }
        ))
  }

  // Returns data for cases by business name
  searchUserCases(business: BusinessName) {
    const api = `${this.endpoint}/search-cases-adm`;
    return this.http.post<any>(api, business)
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No business with this name.");
          }
        ))
  }

  // Delete a business user
  deleteUserAdm(id: any): Observable<any> {
    const api = `${this.endpoint}/business-user-adm/${id}`;
    return this.http.delete<any>(api, id)
      .pipe(
        map(
          data => {
            return true;
          },
          (error: any) => {
            window.alert("No user business to delete.");
          }
        ))
  }

  // Delete a business user
  deleteUserCaseAdm(id: any): Observable<any> {
    const api = `${this.endpoint}/cases-user-adm/${id}`;
    return this.http.delete<any>(api, id)
      .pipe(
        map(
          data => {
            return true;
          },
          (error: any) => {
            window.alert("No case to delete.");
          }
        ))
  }
}