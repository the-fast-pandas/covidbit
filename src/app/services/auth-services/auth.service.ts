// Server - CovidBit - Fast Pandas
// Created: 08, February, 2021, Teresa Costa
// Changed: 03, March, 2021, Teresa Costa: added authentication for administrator

import { Injectable } from '@angular/core';
import { LoginCredentials } from '../../models/logincredentials.model';
import { SmallBusiness } from '../../models/smallBusiness.model';
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

  constructor(private http: HttpClient, public router: Router) { }

  // Business User Registration
  registerUser(user: SmallBusiness, registeredBy: Boolean) {
    user.registeredBy = registeredBy;
    const api = `${this.endpoint}/registration-form`;
    return this.http.post<any>(api, user)
      .subscribe(
        (data: SmallBusiness) => {
          if (registeredBy == true) {
            this.router.navigate(['admin-dashboard']);
          } else {
            this.router.navigate(['login-form']);
          }
        },
        (error: any) => {
          if (registeredBy == true) {
            window.alert("Registration of new user not Allowed!");
            this.router.navigate(['admin-dashboard']);
          } else {
            this.router.navigate(['registration-form']).then(() => {
              localStorage.setItem('server_warning', 'true');
              window.location.reload();
            });
          }
        }
      )
  }


  // Business user login
  logIn(user: LoginCredentials) {
    const api = `${this.endpoint}/login-form`;
    return this.http.post<any>(api, user).pipe()
      .subscribe(
        data => {
          localStorage.setItem('access_token', data.accessToken);
          localStorage.setItem('name_header', data.user.businessName);
          localStorage.setItem('business_id', data.user._id);
          this.getUserDashboard(data.user._id)
            .subscribe(
              data => {
                this.router.navigate(['/business-dashboard/' + data.user._id]);
              })
        },
        error => {
          this.router.navigate(['login-form']).then(() => {
            localStorage.setItem('server_warning', 'true');
            window.location.reload();
          });;
        }
      )
  }

  // Administrator user login
  logInAdmin(user: LoginCredentials) {
    const api = `${this.endpoint}/login-admin`;
    return this.http.post<any>(api, user)
      .subscribe(
        data => {
          localStorage.removeItem('access_token');
          localStorage.setItem('admin_token', data.adminToken);
          this.router.navigate(['/admin-dashboard']).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.log("Not valid administrator credentials!");
        }
      )
  }

  // Business User Logout
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('name_header');
    localStorage.removeItem('business_id');
    if (removeToken == null) {
      this.router.navigate(['login-form']);
    }
  }

  // Administrator Logout
  doLogoutAdmin() {
    let removeToken = localStorage.removeItem('admin_token');
    if (removeToken == null) {
      this.router.navigate(['home']);
    }
  }

  // Get business user Dashboard
  getUserDashboard(id: any): Observable<any> {
    const api = `${this.endpoint}/business-dashboard/${id}`;
    return this.http.get<any>(api, { headers: this.headers }).pipe(
      map(
        data => {
          return data;
        },
        (error: any) => {
          this.router.navigate(['login-form']);
        }
      ))
  }

  // Edit the Business Profile
  editProfile(user: SmallBusiness, id: String) {
    const api = `${this.endpoint}/edit-profile/${id}`;
    return this.http.put<any>(api, user)
      .subscribe(
        data => {
          this.router.navigate(['/business-dashboard/' + data.id]).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.log("It was not possible to edit profile!");
        }
      )
  }

  addSafety(safety: any, id: String) {
    const api = `${this.endpoint}/add-safety/${id}`;
    return this.http.put<any>(api, safety)
      .subscribe(
        data => {
          return data;
        },
        error => {
          console.log("It was not possible to add safety meausure!");
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

  get isAdmin(): boolean {
    let authToken = localStorage.getItem('admin_token');
    return (authToken !== null) ? true : false;
  }

  addCertification(certification: any, id: String) {
    const api = `${this.endpoint}/certification-form/${id}`;
    return this.http.put<any>(api, certification)
      .subscribe(
        data => {
          return data;
        },
        error => {
          console.log("It was not possible to add certification!");
        }
      )
  }

}