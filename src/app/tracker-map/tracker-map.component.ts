import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { searchSB } from '../models/searchSB.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmService } from '../services/adm-services/adm.service';
import { BusinessName } from '../models/businessName.model';
import * as $ from "jquery"
import { ApiService } from '../services/api-covid-services/api.service';


@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html',
  styleUrls: ['./tracker-map.component.scss']
})


export class TrackerMapComponent implements OnInit {
  [x: string]: any;

  //BusinessName Form Group
  businessSearch: FormGroup = new FormGroup({});

  //data
  searchSB: searchSB[] = [];
  businessName!: string;

  //map
  title: string = 'COVIDBIT project';
  lat: number = 43.651070;
  lng: number = -79.347015;
  zoom: number = 10;
  address: string | undefined;
  private geoCoder!: google.maps.Geocoder;


  //COVID-19 Tracker API Variables
  caseInformation: any;
  currentDate: any;
  totalCases: any
  totalCriticals: any
  totalFatalities: any
  totalHospitalizations: any;
  totalRecoveries: any;
  totalTests: any
  totalVaccinations: any
  totalVaccinated: any
  totalVaccinesDistributed: any

  businessNameDB: BusinessName = { name: '' };
  locationToBeSearched: String = ''

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public adm: AdmService, private apiService: ApiService) {}


  ngOnInit() {

    this.searchSB = [
      {
        "ID": 1,
        "businessName": "CN Tower",
        "businessLocation": "290 Bremner Blvd",
        "category": "Entertainment",
        "cases": 0,
        "employees": "100"
      },
      {
        "ID": 2,
        "businessName": "Queen Street Warehouse",
        "businessLocation": "232 Queen St W",
        "category": "Restaurant",
        "cases": 10,
        "employees": "10-50"
      },
      {
        "ID": 3,
        "businessName": "Maha's Egyptian Brunch",
        "businessLocation": "226 Greenwood Ave",
        "category": "Restaurant",
        "cases": 2,
        "employees": "1-10"
      }

    ]

    this.businessSearch = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      searchLocation: new FormControl('')
    })
  
}

  onSubmit(){
    this.adm.searchBusinessNameLocationAdm(this.businessNameDB).subscribe(
      data => {
        console.log(data);
        this.getBusinessLocation(data);
        this.businessSearch.get("searchLocation")?.setValue(this.locationToBeSearched);
        this.apiService.getLocationCoords(this.locationToBeSearched).subscribe((data) => {
          console.log(data);
          this.getCoords(data)
        })
      }
    );

  }

  getBusinessLocation(data: any) {
    for (let i = 0; i < data.myUsers.length; i++) {

      if (data.myUsers[i].businessName == this.businessSearch.get('businessName')?.value) {
        this.locationToBeSearched = data.myUsers[i].location;
      }

    }
  }

  getCoords(data: any) {
    for (let i = 0; i < data.results.length; i++) {

      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);

      this.lat = data.results[0].geometry.location.lat;
      this.lng = data.results[0].geometry.location.lng;
      this.zoom = 12;

    }
  }

  Search() {
    if (this.businessName != "") {
      this.searchSB = this.searchSB.filter(res => {
        return res.businessName.toLocaleLowerCase().match(this.businessName.toLocaleLowerCase());
      })
    } else if (this.businessName == "") {
      this.ngOnInit();
    }

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(lat: number, lng: number) {
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng } }, (results: { formatted_address: string; }[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  //calendar   
  date = new Date();

 
}
