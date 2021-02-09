import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/logincredentials.model';
import { SmallBusiness } from '../models/smallBusiness.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {
  }

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
          this.router.navigate(['home']);
        },
        error => {
          this.router.navigate(['wrong-request']);
        }
      )
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }



}