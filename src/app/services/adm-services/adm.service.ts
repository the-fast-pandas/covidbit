// Server - CovidBit - Fast Pandas
// Created: 04, March, 2021, Teresa Costa

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessNameandLocation } from 'src/app/models/businessName&Location.model';
import { BusinessName } from '../../models/businessName.model';


@Injectable({
  providedIn: 'root'
})
export class AdmService {

  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  ////////////   BUSINESS USER //////////////

  // For the administrator to search multiple users on database using business name
  searchUserAdm(business: BusinessName) {
    const api = `${this.endpoint}/search-users-adm`;
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

  //Search for Business Name and Location
  searchBusinessNameLocationAdm(business: BusinessName) {
    const api = `${this.endpoint}/search-nameandLocation-adm`;
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
    const api = `${this.endpoint}/delete-business-user/${id}`;
    return this.http.delete<any>(api, id)
      .pipe(
        map(
          data => {
            return true;
          },
          (error: any) => {
            window.alert("No business user to delete.");
          }
        ))
  }

  ////////////   CASES    //////////////

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

  // Delete a case
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