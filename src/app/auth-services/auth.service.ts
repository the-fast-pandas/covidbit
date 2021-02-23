// Server - CovidBit - Fast Pandas
// Created: 08, February, 2021, Teresa Costa

import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/logincredentials.model';
import { SmallBusiness } from '../models/smallBusiness.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators'
import { TheadFitlersRowComponent } from 'ng2-smart-table/lib/components/thead/rows/thead-filters-row.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {
  }

  loggedIn = false;
  
  signUp(user: SmallBusiness) {
    let api = `${this.endpoint}/registration-form`;
    return this.http.post<any>(api, user)
      .subscribe(
        data => {
          
          this.router.navigate(['login-form']);
        },
        error => {
          this.router.navigate(['wrong-request']);
        }
      )
  }

  logIn(user: LoginCredentials) {
    return this.http.post<any>(`${this.endpoint}/login-form`, user)
      .subscribe(
        data => {
          console.log(data);
          this.loggedIn = true;
          this.router.navigate(['home']);
        },
        error => {
          window.alert("Wrong Credentials");
          this.router.navigate(['login-form']);
        }
      )
  }

  getUserDashboard(): Observable<any> {
    let api = `${this.endpoint}/business-dasboard`;
    return this.http.get<any>(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return this.router.navigate(['business-dashboard']);
      }),
      catchError(this.handleError)
    )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.loggedIn = false
      this.router.navigate(['login-form']);
    }
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