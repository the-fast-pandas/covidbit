import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint: string = 'http://localhost:2000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  // Get Small Business View
  getUserView() {
    const api = `${this.endpoint}/business-user-view`;
    return this.http.get<any>(api)
      .subscribe(data => {
        this.router.navigate(['business-user-view']);
      },
        error => {
          window.alert("No Business with this name");
          this.router.navigate(['home']);
        }
      )
  }





}
