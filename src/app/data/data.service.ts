import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessName } from '../models/businessName.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  // search Business User
  searchUser(business: BusinessName) {
    const api = `${this.endpoint}/search`;
    console.log("Here");
    return this.http.post<any>(api, business)
      .subscribe(
        data => {
          this.getUserView(data.id).subscribe(
            data => {
              this.router.navigate(['/business-user-view/' + data.user._id]);
            })
        },
        error => {
          window.alert("No business with this name");
          this.router.navigate(['home']);
        }
      )
  }

  // Get Small Business View
  getUserView(id: any): Observable<any> {
    console.log(id);
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
}
