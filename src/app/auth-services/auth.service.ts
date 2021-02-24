// Server - CovidBit - Fast Pandas
// Created: 08, February, 2021, Teresa Costa

import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/logincredentials.model';
import { SmallBusiness } from '../models/smallBusiness.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) { }

  // User Registration
  signUp(user: SmallBusiness) {
    const api = `${this.endpoint}/registration-form`;
    return this.http.post<any>(api, user)
      .subscribe(
        data => {
          this.router.navigate(['login-form']);
        },
        error => {
          window.alert("Registration not Allowed");
          this.router.navigate(['registration-form']);
        }
      )
  }

  loggedIn = false; // Controls header

  // User login (administrators/business)
  logIn(user: LoginCredentials) {
    const api = `${this.endpoint}/login-form`;
    return this.http.post<any>(api, user)
      .subscribe((res: any) => {
        this.loggedIn = true;
        localStorage.setItem('access_token', res.token)
          this.router.navigate(['business-dashboard']);
      },
        error => {
          window.alert("Wrong Credentials");
          this.router.navigate(['login-form']);
        }
      )
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.loggedIn = false
      this.router.navigate(['login-form']);
    }
  }

  // Get user Dashboard
  getUserDashboard(): Observable<any> {
    const api = `${this.endpoint}/business-dasboard`;
    return this.http.get<any>(api);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}