import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessSearch } from './search-widget/BusinessSearch';

let perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {

  constructor(private http: HttpClient) { }

  getStaticPost(): BusinessSearch{ // return type "Post"
    return {
      _id: 1,
      name: "parpar",
      location: "Toronto"
    }
  }

}
