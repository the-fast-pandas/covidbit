// Server - CovidBit - Fast Pandas
// Created: 23, February, 2021, Teresa Costa

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../../models/logincredentials.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessName } from '../../models/businessName.model';
import { LoginId } from '../../models/loginId';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  // Search Business User
  searchUser(business: BusinessName) {
    const api = `${this.endpoint}/search`;
    return this.http.post<any>(api, business)
      .subscribe(
        data => {
          this.getUserView(data.id).subscribe(
            data => {
              this.router.navigate(['/business-user-view/' + data.user._id]).then(() => {
                window.location.reload();
              });
            })
        },
        error => {
          window.alert("Search: No business with this name");
          this.router.navigate(['home']);
        }
      )
  }

  // Get User Business View
  getUserView(id: any): Observable<any> {
    const api = `${this.endpoint}/business-user-view/${id}`;
    return this.http.get<any>(api, id)
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No business with this name");
            this.router.navigate(['home']);
          }
        ))
  }

  // Get a valid User for Registration 
  getValidUser(user: LoginCredentials) {
    const api = `${this.endpoint}/check-user`;
    return this.http.post<any>(api, user)
      .subscribe(
        data => {
          return true;
        },
        error => {
          this.router.navigate(['registration-form']).then(() => {
            localStorage.setItem('server_warning', 'true');
            window.location.reload();
          });
        }
      )
  }

  requestNewPassword(loginId: LoginId) {
    console.log(loginId);
    const api = `${this.endpoint}/forgot-password`;
    return this.http.post<any>(api, loginId)
      .subscribe(
        data => {
          this.router.navigate(['login-form']).then(() => {
            localStorage.setItem('new_password', 'true');
            window.location.reload();
          });;
        },
        error => {
          console.log("Not valid loginID!");
        }
      )
  }

}
