// Server - CovidBit - Fast Pandas
// Created: 08, February, 2021, Teresa Costa

import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/logincredentials.model';
import { SmallBusiness } from '../models/smallBusiness.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      .subscribe(
        data => {
          this.loggedIn = true;
          localStorage.setItem('access_token', data.token)
          this.getUserDashboard(data.user._id).subscribe(
            data => {
              this.router.navigate(['/business-dashboard/' + data.user._id]);
            })
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
  getUserDashboard(id: any): Observable<any> {
    const api = `${this.endpoint}/business-dashboard/${id}`;
    return this.http.get<any>(api, { headers: this.headers }).pipe(
      map(
        data => {
          return data;
        },
        (error: any) => {
          window.alert("You need to login.");
          this.router.navigate(['login-form']);
        }
      ))
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

}