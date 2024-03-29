// Server - CovidBit - Fast Pandas
// Created: 04, March, 2021, Teresa Costa

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
// Local Services
import { BusinessName } from '../../models/businessName.model';
import { Cases } from '../../models/case.model';
import { Email } from '../../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class AdmService {

  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
  });

  constructor(private http: HttpClient, public router: Router) { }

  ////////////   BUSINESS USER //////////////

  // Administrator to search multiple users on database using business name
  getUserAdm(business: BusinessName) {
    const api = `${this.endpoint}/get-user-adm`;
    return this.http.post<any>(api, business).pipe(
      map(
        data => {
          return data;
        },
        (error: any) => {
          window.alert("Not possible to get business users.");
        }
      )
    )
  }

  // Administrator sends invitation to new user to register
  inviteNewUser(email: Email) {
    const api = `${this.endpoint}/invite-new-user`;
    return this.http.post<any>(api, email).pipe(
      map(
        data => {
          return data;
        },
        (error: any) => {
          window.alert("Not possible to send invitation");
        }
      )
    )
  }

  // Administrator can delete a business user
  deleteUserAdm(id: Array<String>) {
    const api = `${this.endpoint}/delete-user-adm`;
    return this.http.post<String>(api, id).pipe(
      map(
        data => {
          return data;
        },
        (error: any) => {
          window.alert("Not possible to delete business user.");
        }
      )
    )
  }

  ////////////   CASES    //////////////

  // Administrator can search cases for a specific business
  getUserCases(business: BusinessName) {
    console.log(business)
    const api = `${this.endpoint}/get-user-cases`;
    return this.http.post<any>(api, business).pipe(
      map(
        (data) => {
          return data;
        },
        (error: any) => {
          window.alert("Not possible to get user cases.");
        }
      ))
  }

  // Administrator can add a case
  addUserCasesAdm(data: Cases) {
    const api = `${this.endpoint}/add-user-cases-adm`;
    return this.http.post<any>(api, data, { headers: this.headers }).subscribe(
      (data) => {
        return data;
      },
      (error: any) => {
        window.alert("No possible to add a new case.");
      }
    )
  }

  // Administrator can delete a business user case
  deleteUserCasesAdm(id: Array<String>) {
    const api = `${this.endpoint}/delete-user-cases-adm`;
    return this.http.post<String>(api, id).pipe(
      map(
        data => {
          return data;
        },
        (error: any) => {
          window.alert("Not possible to delete a case.");
        }
      )
    )
  }


  /////WHAT IS THIS ROUTE?

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

}