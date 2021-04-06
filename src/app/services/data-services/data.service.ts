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

  endpoint: string = 'https://backend-covidbit.herokuapp.com/api';
  headers  = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
   // 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE',
    //'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
  });

  constructor(private http: HttpClient, public router: Router) { }

  // Search Business User
  searchUser(business: BusinessName) {
    const api = `${this.endpoint}/search`;
    return this.http.post<any>(api, business,  { headers: this.headers })
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

   // Get User Business View
   getMapInfo(id: any): Observable<any> {
    const api = `${this.endpoint}/tracker-map-view/${id}`;
    return this.http.get<any>(api,  { headers: this.headers })
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
    return this.http.post<any>(api, user,  { headers: this.headers })
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

  // Business User can request a new password
  requestNewPassword(loginId: LoginId) {
    const api = `${this.endpoint}/forgot-password`;
    return this.http.post<any>(api, loginId,  { headers: this.headers })
      .subscribe(
        (data: any) => {
          this.router.navigate(['login-form']).then(() => {
            localStorage.setItem('new_password', 'true');
            window.location.reload();
          });;
        },
        (error: any) => {
          this.router.navigate(['new-password']).then(() => {
            localStorage.setItem('new_password_warning', 'true');
            window.location.reload();
          });
        }
      )
  }

  checkValidNewPassword(token: any) {
    const api = `${this.endpoint}/check-reset-password/${token}`;
    return this.http.get<any>(api,  { headers: this.headers })
      .subscribe(
        (data: any) => {
          return data;
        },
        (error: any) => {
          window.alert("This is not a valid link");
          this.router.navigate(['home']);
        })
  }

  setNewPassword(newPassword: any, token: any) {
    newPassword.token = token;
    const api = `${this.endpoint}/new-password`;
    return this.http.put<any>(api, newPassword,  { headers: this.headers })
      .subscribe(
        data => {
          this.router.navigate(['login-form']);
        },
        error => {
          console.log("It was not possible to chance password!");
        }
      )

  }

  getAllBusiness() {
    const api = `${this.endpoint}/all-business`;
    return this.http.get<any>(api,  { headers: this.headers })
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No business with this name");
          }
        ))

  }


  getAllCases() {
    const api = `${this.endpoint}/all-cases`;
    return this.http.get<any>(api,  { headers: this.headers })
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No cases in databse");
          }
        ))

  }


  getAllSafety() {
    const api = `${this.endpoint}/all-safety`;
    return this.http.get<any>(api,  { headers: this.headers })
      .pipe(
        map(
          data => {
            return data;
          },
          (error: any) => {
            window.alert("No Safety Measures in database!");
          }
        ))

  }

  // Business User is allowed to add safety measures
  addReview(review: any, id: String) {
    const api = `${this.endpoint}/add-review/${id}`;
    return this.http.put<any>(api, review,  { headers: this.headers })
      .subscribe(
        data => {
          return data;
        },
        error => {
          console.log("It was not possible to add review!");
        }
      )
  }

  // News headlines about covid
  getNews() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=fd7187b0369b44b1b4f9a03c11a32b9a`,  { headers: this.headers })
  }
}
