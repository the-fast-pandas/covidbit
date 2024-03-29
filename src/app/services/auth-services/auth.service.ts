// Server - CovidBit - Fast Pandas
// Created: 08, February, 2021, Teresa Costa

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Local services
import { LoginCredentials } from '../../models/logincredentials.model';
import { SafetyMeasures } from '../../models/safetyMeasures.model';
import { SmallBusiness } from '../../models/smallBusiness.model';
import { DataService } from '../data-services/data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
  });

  constructor(private http: HttpClient, public router: Router, public data: DataService) { }

  // Business User Registration (Administrator/ New Business User)
  registrationForm(user: SmallBusiness, safetyMeasures: Array<SafetyMeasures>, registeredBy: Boolean) {
    user.registeredBy = registeredBy;
    const api = `${this.endpoint}/registration-form`;
    return this.http.post<any>(api, { user, safetyMeasures }).subscribe(
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

  // Business user/Administrator login Form
  loginForm(user: LoginCredentials) {
    const api = `${this.endpoint}/login-form`;
    return this.http.post<any>(api, user).pipe().subscribe(
      (data: any) => {
        if (data.admin !== undefined && data.admin.loginId === "admin@myAdmin.ca") {
          localStorage.removeItem('access_token');
          localStorage.setItem('admin_token', data.adminToken);
          this.router.navigate(['/admin-dashboard']).then(() => {
            window.location.reload();
          });
        } else {
          localStorage.setItem('access_token', data.accessToken);
          localStorage.setItem('name_header', data.user.businessName);
          localStorage.setItem('business_id', data.user._id);
          this.data.getUserView(data.user._id)
            .subscribe(
              data => {
                this.router.navigate(['/business-dashboard/' + data.user._id]);
              }
            )
        }
      },
      (error: any) => {
        this.router.navigate(['login-form']).then(() => {
          localStorage.setItem('server_warning', 'true');
          window.location.reload();
        });;
      }
    )
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

  // Business User is allowed to add safety measures
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

  // Retrieve local storage
  getToken() {
    return localStorage.getItem('access_token') || localStorage.getItem('admin_token');
  }
  getBusinesName() {
    return localStorage.getItem('name_header');
  }
  getId() {
    return localStorage.getItem('business_id');
  }

  // Business User Logout
  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('name_header');
    localStorage.removeItem('business_id');
    this.router.navigate(['login-form']);
  }

  // Check if it is authenticated
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
    return this.http.post<any>(api, certification)
      .subscribe(
        data => {
          this.router.navigate(['/business-dashboard/' + data.id]).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.log("It was not possible to add certification!");
        }
      )
  }

  deleteSafety(id: String) {
    const api = `${this.endpoint}/remove-safety`;
    return this.http.post<String>(api, id)
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No case to delete.");
          }
        )
      )
  }

}